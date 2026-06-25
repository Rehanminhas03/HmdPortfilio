"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { FieldConfig, ResourceConfig } from "@/lib/admin-config";

type Row = Record<string, unknown>;
type FormState = Record<string, unknown>;
type SelectOptions = Record<string, { value: string; label: string }[]>;

/** Unique storage path — module scope keeps the impure calls out of render. */
function storagePath(table: string, field: string, fileName: string): string {
  const ext = fileName.split(".").pop() || "jpg";
  return `${table}/${field}-${Date.now()}-${Math.floor(Math.random() * 1e6)}.${ext}`;
}

function isVideoUrl(url: string): boolean {
  return /\.(mp4|webm|ogg|ogv|mov|m4v)(\?.*)?$/i.test(url);
}

/** Read natural pixel dimensions from an image or video file (browser only). */
function readDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const objectUrl = URL.createObjectURL(file);
    const done = (width: number, height: number) => {
      URL.revokeObjectURL(objectUrl);
      resolve({ width, height });
    };
    if (file.type.startsWith("video")) {
      const v = document.createElement("video");
      v.preload = "metadata";
      v.onloadedmetadata = () => done(v.videoWidth, v.videoHeight);
      v.onerror = () => done(0, 0);
      v.src = objectUrl;
    } else {
      const img = new window.Image();
      img.onload = () => done(img.naturalWidth, img.naturalHeight);
      img.onerror = () => done(0, 0);
      img.src = objectUrl;
    }
  });
}

function emptyForm(config: ResourceConfig, nextOrder: number): FormState {
  const form: FormState = {};
  for (const f of config.fields) {
    if (f.name === "sort_order") form[f.name] = nextOrder;
    else if (f.type === "number") form[f.name] = 0;
    else if (f.type === "boolean") form[f.name] = false;
    else if (f.type === "tags") form[f.name] = [];
    else if (f.type === "select" && f.options) form[f.name] = f.options[0]?.value ?? "";
    else form[f.name] = "";
  }
  return form;
}

export default function ResourceManager({ config }: { config: ResourceConfig }) {
  const supabase = useMemo(() => createClient(), []);
  const [rows, setRows] = useState<Row[]>([]);
  const [options, setOptions] = useState<SelectOptions>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<FormState>({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = useCallback(async () => {
    // Fetch first (await) so no state is set synchronously in the effect body.
    const { data, error } = await supabase
      .from(config.table)
      .select("*")
      .order("sort_order", { ascending: true });

    // Load options for any relational select fields.
    const opts: SelectOptions = {};
    for (const f of config.fields) {
      if (f.optionsFrom) {
        const { data: od } = await supabase
          .from(f.optionsFrom.table)
          .select(`id, ${f.optionsFrom.labelColumn}`)
          .order("sort_order", { ascending: true });
        opts[f.name] = ((od as unknown as Row[]) ?? []).map((o) => ({
          value: String(o.id),
          label: String(o[f.optionsFrom!.labelColumn] ?? ""),
        }));
      }
    }

    setRows((data as Row[]) ?? []);
    setOptions(opts);
    setError(error ? error.message : null);
    setLoading(false);
  }, [supabase, config]);

  useEffect(() => {
    // Initial data fetch on mount — load() awaits before any setState, so this
    // is a valid effect-based data load (the lint rule is conservative here).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  function startCreate() {
    setEditingId(null);
    setCreating(true);
    setForm(emptyForm(config, rows.length));
  }

  function startEdit(row: Row) {
    setCreating(false);
    setEditingId(String(row.id));
    const f: FormState = {};
    for (const field of config.fields) {
      const v = row[field.name];
      f[field.name] =
        field.type === "tags"
          ? (Array.isArray(v) ? v : [])
          : v ?? (field.type === "number" ? 0 : field.type === "boolean" ? false : "");
    }
    setForm(f);
  }

  function closeForm() {
    setCreating(false);
    setEditingId(null);
    setForm({});
  }

  function setField(name: string, value: unknown) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function uploadImage(field: FieldConfig, file: File) {
    setUploading(true);
    setError(null);
    try {
      const dims = await readDimensions(file);
      const safe = storagePath(config.table, field.name, file.name);
      const { error: upErr } = await supabase.storage
        .from("media")
        .upload(safe, file, { upsert: true, cacheControl: "3600" });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from("media").getPublicUrl(safe);
      setField(field.name, data.publicUrl);
      // Auto-fill companion dimension fields when the resource has them.
      const names = new Set(config.fields.map((f) => f.name));
      if (dims.width && dims.height) {
        if (names.has("width")) setField("width", dims.width);
        if (names.has("height")) setField("height", dims.height);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function save() {
    setSaving(true);
    setError(null);
    const payload: Row = {};
    for (const f of config.fields) {
      let v = form[f.name];
      if (f.type === "number") v = Number(v) || 0;
      else if (f.type === "boolean") v = Boolean(v);
      else if (f.type === "tags") v = Array.isArray(v) ? v : [];
      else if (f.type === "select" && f.optionsFrom) v = v ? v : null;
      payload[f.name] = v as unknown as Row[string];
    }

    let saveError = null;
    if (editingId) {
      const { error } = await supabase
        .from(config.table)
        .update(payload)
        .eq("id", editingId);
      saveError = error;
    } else {
      const { error } = await supabase.from(config.table).insert(payload);
      saveError = error;
    }
    setSaving(false);
    if (saveError) {
      setError(saveError.message);
      return;
    }
    closeForm();
    load();
  }

  async function remove(row: Row) {
    if (!confirm(`Delete this ${config.singular.toLowerCase()}? This cannot be undone.`)) return;
    const { error } = await supabase.from(config.table).delete().eq("id", row.id);
    if (error) {
      setError(error.message);
      return;
    }
    load();
  }

  const showingForm = creating || editingId !== null;

  return (
    <div>
      <div className="mb-7 flex items-center justify-between">
        <div>
          <h1 className="font-cormorant text-3xl font-light text-white">{config.title}</h1>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">
            {rows.length} item{rows.length === 1 ? "" : "s"}
          </p>
        </div>
        {!showingForm && (
          <button
            type="button"
            onClick={startCreate}
            className="bg-gold px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-obsidian transition-colors hover:bg-[#d8b95c]"
          >
            + Add {config.singular}
          </button>
        )}
      </div>

      {error && (
        <div className="mb-5 border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {showingForm && (
        <div className="mb-8 border border-border bg-surface p-6">
          <h2 className="mb-5 font-cormorant text-xl text-gold">
            {editingId ? `Edit ${config.singular}` : `New ${config.singular}`}
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {config.fields.filter((f) => !f.hidden).map((f) => (
              <div
                key={f.name}
                className={
                  f.type === "textarea" || f.type === "tags" || f.type === "file"
                    ? "md:col-span-2"
                    : ""
                }
              >
                <label className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-muted">
                  {f.label}
                  {f.required && <span className="text-gold"> *</span>}
                </label>
                <FieldInput
                  field={f}
                  value={form[f.name]}
                  options={options[f.name]}
                  uploading={uploading}
                  onChange={(v) => setField(f.name, v)}
                  onUpload={(file) => uploadImage(f, file)}
                />
                {f.help && <p className="mt-1 text-[0.7rem] text-muted/80">{f.help}</p>}
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={save}
              disabled={saving || uploading}
              className="bg-gold px-6 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-obsidian transition-colors hover:bg-[#d8b95c] disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="border border-border px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-muted">No items yet. Click “Add {config.singular}”.</p>
      ) : (
        <ul className="space-y-2">
          {rows.map((row) => {
            const img = config.imageField ? (row[config.imageField] as string) : "";
            const subField = config.subLabelField
              ? config.fields.find((f) => f.name === config.subLabelField)
              : undefined;
            const rawSub = config.subLabelField ? row[config.subLabelField] : "";
            let subText = String(rawSub ?? "");
            if (subField?.optionsFrom && config.subLabelField) {
              const match = options[config.subLabelField]?.find(
                (o) => o.value === String(rawSub)
              );
              if (match) subText = match.label;
            }
            return (
              <li
                key={String(row.id)}
                className="flex items-center gap-4 border border-border bg-surface px-4 py-3"
              >
                {config.imageField && (
                  <div className="relative flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded border border-border bg-obsidian">
                    {img && isVideoUrl(img) ? (
                      <span className="text-lg">🎬</span>
                    ) : img ? (
                      <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                    ) : (
                      <span className="text-lg">{(row.emoji as string) || "—"}</span>
                    )}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-white">
                    {String(row[config.labelField] || "(untitled)")}
                  </p>
                  {config.subLabelField && (
                    <p className="truncate text-xs text-muted">{subText}</p>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(row)}
                    className="border border-border px-3 py-1.5 text-xs uppercase tracking-wide text-muted transition-colors hover:border-gold hover:text-gold"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(row)}
                    className="border border-border px-3 py-1.5 text-xs uppercase tracking-wide text-muted transition-colors hover:border-red-500/60 hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function FieldInput({
  field,
  value,
  options,
  uploading,
  onChange,
  onUpload,
}: {
  field: FieldConfig;
  value: unknown;
  options?: { value: string; label: string }[];
  uploading: boolean;
  onChange: (v: unknown) => void;
  onUpload: (file: File) => void;
}) {
  const base =
    "w-full border border-border bg-obsidian px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-gold placeholder:text-muted/60";

  switch (field.type) {
    case "textarea":
      return (
        <textarea
          rows={3}
          className={base}
          placeholder={field.placeholder}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "number":
      return (
        <input
          type="number"
          className={base}
          value={Number(value ?? 0)}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "boolean":
      return (
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-white">
          <input
            type="checkbox"
            className="h-4 w-4 accent-[#C9A84C]"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
          />
          <span className="text-muted">Enabled</span>
        </label>
      );
    case "select":
      return (
        <select
          className={base}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">— select —</option>
          {(field.options ?? options ?? []).map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      );
    case "tags": {
      const arr = Array.isArray(value) ? (value as string[]) : [];
      return (
        <textarea
          rows={3}
          className={base}
          placeholder={field.placeholder ?? "One per line"}
          value={arr.join("\n")}
          onChange={(e) =>
            onChange(
              e.target.value
                .split(/[\n,]/)
                .map((s) => s.trim())
                .filter(Boolean)
            )
          }
        />
      );
    }
    case "image":
    case "file": {
      const url = String(value ?? "");
      const acceptVideo = field.type === "file";
      const accept = acceptVideo ? "image/*,video/*" : "image/*";
      const video = url && isVideoUrl(url);
      const noun = acceptVideo ? "file" : "image";
      return (
        <div className="space-y-3">
          {url && (
            <div className="relative h-40 w-full overflow-hidden rounded border border-border bg-obsidian">
              {video ? (
                <video
                  src={url}
                  controls
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <Image src={url} alt="" fill className="object-cover" sizes="320px" />
              )}
            </div>
          )}
          <div className="flex items-center gap-3">
            <label className="cursor-pointer border border-border px-4 py-2 text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:border-gold hover:text-gold">
              {uploading ? "Uploading…" : url ? `Replace ${noun}` : `Upload ${noun}`}
              <input
                type="file"
                accept={accept}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onUpload(file);
                  e.target.value = "";
                }}
              />
            </label>
            {url && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="text-xs uppercase tracking-wide text-muted hover:text-red-300"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      );
    }
    default:
      return (
        <input
          type="text"
          className={base}
          placeholder={field.placeholder}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
}
