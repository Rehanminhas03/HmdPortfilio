"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="font-cormorant text-3xl tracking-[0.3em] text-gold">H · A</span>
          <p className="mt-3 text-xs uppercase tracking-[0.3em] text-muted">
            Content Manager
          </p>
        </div>

        <form onSubmit={onSubmit} className="border border-border bg-surface p-7">
          <h1 className="mb-6 font-cormorant text-2xl font-light text-white">Sign in</h1>

          {error && (
            <div className="mb-5 border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <label className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-muted">
            Email
          </label>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full border border-border bg-obsidian px-3 py-2.5 text-sm text-white outline-none focus:border-gold"
          />

          <label className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-muted">
            Password
          </label>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-6 w-full border border-border bg-obsidian px-3 py-2.5 text-sm text-white outline-none focus:border-gold"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold py-3 text-xs font-medium uppercase tracking-[0.2em] text-obsidian transition-colors hover:bg-[#d8b95c] disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
