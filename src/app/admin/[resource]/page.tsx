import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import ResourceManager from "@/components/admin/ResourceManager";
import { getResource, RESOURCES } from "@/lib/admin-config";

export function generateStaticParams() {
  return RESOURCES.map((r) => ({ resource: r.slug }));
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const { resource } = await params;
  const config = getResource(resource);
  if (!config) notFound();

  return (
    <AdminShell>
      <ResourceManager config={config} />
    </AdminShell>
  );
}
