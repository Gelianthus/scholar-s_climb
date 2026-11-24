"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RequireAuth } from "@/components/require-auth";
import { TowerCard, shapes } from "@/components/tower-card";
import { clearedCount, isTowerCleared, towers } from "@/lib/towers";
import { useAuth, useProgress } from "@/lib/auth";

function Towers() {
	const { user } = useAuth();
	const { climbed } = useProgress();
	const towersCleared = towers.filter((t) => isTowerCleared(t, climbed)).length;
	return (
		<main className="mx-auto max-w-6xl space-y-10 px-4 pb-16">
			<div className="space-y-2">
				<h1 className="text-xl">Welcome, {user?.name}</h1>
				<p className="text-2xl">
					{towersCleared} of {towers.length} towers cleared. Pick any tower and
					keep climbing.
				</p>
			</div>
			<ul className="grid items-end gap-x-10 gap-y-16 md:grid-cols-3">
				{towers.map((t, i) => {
					const cleared = clearedCount(t, climbed);
					const done = isTowerCleared(t, climbed);
					return (
						<li key={t.slug}>
							<TowerCard
								shape={shapes[i]}
								state={done ? "cleared" : "open"}
							>
								<div className="flex flex-col gap-3">
									<h2 className="text-sm">{t.name}</h2>
									<p>{t.summary}</p>
									<Badge>
										{cleared} of {t.floors.length} floors cleared
									</Badge>
									<Button asChild>
										<Link href={`/tower/${t.slug}`}>
											{done
												? "Review"
												: cleared > 0
													? "Continue"
													: "Enter tower"}
										</Link>
									</Button>
								</div>
							</TowerCard>
						</li>
					);
				})}
			</ul>
		</main>
	);
}

export default function TowersPage() {
	return (
		<RequireAuth>
			<Towers />
		</RequireAuth>
	);
}
