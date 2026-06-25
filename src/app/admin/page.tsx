import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { RESOURCES } from "@/lib/admin-config";

export default function AdminDashboard() {
  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="font-cormorant text-3xl font-light text-white">Welcome back 👋</h1>
        <p className="mt-2 text-sm text-muted">
          Manage every section of your portfolio. Changes go live on your site
          immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {RESOURCES.map((r) => (
          <Link
            key={r.slug}
            href={`/admin/${r.slug}`}
            className="group border border-border bg-surface p-6 transition-colors hover:border-gold/60 hover:bg-gold/5"
          >
            <h2 className="font-cormorant text-xl text-white group-hover:text-gold">
              {r.title}
            </h2>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">
              Add · edit · delete
            </p>
          </Link>
        ))}
        <Link
          href="/admin/profile"
          className="group border border-border bg-surface p-6 transition-colors hover:border-gold/60 hover:bg-gold/5"
        >
          <h2 className="font-cormorant text-xl text-white group-hover:text-gold">
            Profile &amp; Password
          </h2>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">
            Photo · change password
          </p>
        </Link>
      </div>
    </AdminShell>
  );
}
