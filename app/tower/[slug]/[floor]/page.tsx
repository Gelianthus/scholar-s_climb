import { notFound } from "next/navigation";
import { RequireAuth } from "@/components/require-auth";
import { TowerRun } from "@/components/tower-run";
import { getTower, towers } from "@/lib/towers";

export function generateStaticParams() {
	return towers.flatMap((t) =>
		t.floors.map((_, i) => ({ slug: t.slug, floor: String(i + 1) })),
	);
}

export default async function FloorPage({
	params,
}: {
	params: Promise<{ slug: string; floor: string }>;
}) {
	const { slug, floor } = await params;
	const tower = getTower(slug);
	const index = Number(floor) - 1;
	if (
		!tower ||
		!Number.isInteger(index) ||
		index < 0 ||
		index >= tower.floors.length
	)
		notFound();
	return (
		<RequireAuth>
			<TowerRun
				tower={tower}
				floorIndex={index}
			/>
		</RequireAuth>
	);
}
