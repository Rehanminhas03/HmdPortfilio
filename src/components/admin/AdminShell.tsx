"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { RESOURCES } from "@/lib/admin-config";

const NAV = [
  { slug: "", label: "Dashboard", href: "/admin" },
  ...RESOURCES.map((r) => ({ slug: r.slug, label: r.title, href: `/admin/${r.slug}` })),
  { slug: "profile", label: "Profile & Password", href: "/admin/profile" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-obsidian text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-obsidian/90 px-5 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="text-muted hover:text-white lg:hidden"
            aria-label="Toggle navigation"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
          <span className="font-cormorant text-xl tracking-[0.3em] text-gold">H · A</span>
          <span className="hidden text-xs uppercase tracking-[0.25em] text-muted sm:inline">
            Content Manager
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-white"
          >
            View site ↗
          </Link>
          <button
            type="button"
            onClick={logout}
            className="border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:border-gold hover:text-gold"
          >
            Log out
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar */}
        <aside
          className={`${
            open ? "block" : "hidden"
          } w-full shrink-0 border-b border-border lg:block lg:w-60 lg:border-b-0 lg:border-r`}
        >
          <nav className="flex flex-col p-3">
            {NAV.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded px-4 py-2.5 text-sm transition-colors ${
                    active
                      ? "bg-gold/10 text-gold"
                      : "text-muted hover:bg-surface hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
