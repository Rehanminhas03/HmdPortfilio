"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { createClient } from "@/lib/supabase/client";

export default function ProfilePage() {
  const supabase = useMemo(() => createClient(), []);

  const [photo, setPhoto] = useState("");
  const [loadingPhoto, setLoadingPhoto] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [savingPhoto, setSavingPhoto] = useState(false);
  const [photoMsg, setPhotoMsg] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [savingPass, setSavingPass] = useState(false);
  const [passMsg, setPassMsg] = useState<string | null>(null);
  const [passErr, setPassErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "profile_image_url")
        .maybeSingle();
      setPhoto(data?.value ?? "");
      setLoadingPhoto(false);
    })();
  }, [supabase]);

  async function uploadPhoto(file: File) {
    setUploading(true);
    setPhotoMsg(null);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `profile/photo-${Math.round(performance.now())}.${ext}`;
      const { error } = await supabase.storage
        .from("media")
        .upload(path, file, { upsert: true, cacheControl: "3600" });
      if (error) throw error;
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      setPhoto(data.publicUrl);
    } catch (e) {
      setPhotoMsg(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function savePhoto() {
    setSavingPhoto(true);
    setPhotoMsg(null);
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key: "profile_image_url", value: photo, updated_at: new Date().toISOString() });
    setSavingPhoto(false);
    setPhotoMsg(error ? error.message : "Saved! Your photo is live on the site.");
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setPassErr(null);
    setPassMsg(null);
    if (password.length < 8) {
      setPassErr("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setPassErr("Passwords do not match.");
      return;
    }
    setSavingPass(true);
    const { error } = await supabase.auth.updateUser({ password });
    setSavingPass(false);
    if (error) {
      setPassErr(error.message);
      return;
    }
    setPassword("");
    setConfirm("");
    setPassMsg("Password updated.");
  }

  return (
    <AdminShell>
      <h1 className="mb-7 font-cormorant text-3xl font-light text-white">
        Profile &amp; Password
      </h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Profile photo */}
        <section className="border border-border bg-surface p-6">
          <h2 className="mb-4 font-cormorant text-xl text-gold">Profile photo</h2>
          <p className="mb-5 text-xs text-muted">
            Shown in the About section. Portrait images (3:4) look best.
          </p>

          <div className="relative mb-4 aspect-[3/4] w-40 overflow-hidden border border-border bg-obsidian">
            {loadingPhoto ? null : photo ? (
              <Image src={photo} alt="Profile" fill className="object-cover" sizes="160px" />
            ) : (
              <span className="flex h-full items-center justify-center text-center text-xs uppercase tracking-[0.2em] text-muted">
                No photo
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="cursor-pointer border border-border px-4 py-2 text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:border-gold hover:text-gold">
              {uploading ? "Uploading…" : photo ? "Replace photo" : "Upload photo"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadPhoto(file);
                  e.target.value = "";
                }}
              />
            </label>
            {photo && (
              <button
                type="button"
                onClick={() => setPhoto("")}
                className="text-xs uppercase tracking-wide text-muted hover:text-red-300"
              >
                Remove
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={savePhoto}
            disabled={savingPhoto || uploading}
            className="mt-5 bg-gold px-6 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-obsidian transition-colors hover:bg-[#d8b95c] disabled:opacity-50"
          >
            {savingPhoto ? "Saving…" : "Save photo"}
          </button>
          {photoMsg && <p className="mt-3 text-xs text-muted">{photoMsg}</p>}
        </section>

        {/* Change password */}
        <section className="border border-border bg-surface p-6">
          <h2 className="mb-4 font-cormorant text-xl text-gold">Change password</h2>
          <p className="mb-5 text-xs text-muted">
            Set a new password for your admin login.
          </p>

          {passErr && (
            <div className="mb-4 border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {passErr}
            </div>
          )}
          {passMsg && (
            <div className="mb-4 border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-green-300">
              {passMsg}
            </div>
          )}

          <form onSubmit={changePassword}>
            <label className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-muted">
              New password
            </label>
            <input
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 w-full border border-border bg-obsidian px-3 py-2.5 text-sm text-white outline-none focus:border-gold"
            />
            <label className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-muted">
              Confirm new password
            </label>
            <input
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mb-6 w-full border border-border bg-obsidian px-3 py-2.5 text-sm text-white outline-none focus:border-gold"
            />
            <button
              type="submit"
              disabled={savingPass}
              className="bg-gold px-6 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-obsidian transition-colors hover:bg-[#d8b95c] disabled:opacity-50"
            >
              {savingPass ? "Updating…" : "Update password"}
            </button>
          </form>
        </section>
      </div>
    </AdminShell>
  );
}
