import { notFound } from "next/navigation";
import { RequireAuth } from "@/components/require-auth";
import { TowerRun } from "@/components/tower-run";
import { getTower, towers } from "@/lib/towers";

export function generateStaticParams() { return towers.map((t) => ({ slug: t.slug })); }

export default async function TowerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tower = getTower(slug);
  if (!tower) notFound();
  return <RequireAuth><TowerRun tower={tower} /></RequireAuth>;
}
