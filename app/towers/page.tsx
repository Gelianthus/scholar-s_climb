"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RequireAuth } from "@/components/require-auth";
import { Badge } from "@/components/ui/badge";
import { TowerCard, shapes } from "@/components/tower-card";
import { Lock } from "lucide-react";
import { towers } from "@/lib/towers";
import { useAuth, useProgress } from "@/lib/auth";

function Towers() {
	const { user } = useAuth();
	const { climbed } = useProgress();
	return (
		<main className="mx-auto max-w-6xl space-y-10 px-4 pb-16">
			<div className="space-y-2">
				<h1 className="text-xl">Welcome, {user?.name}</h1>
				<p className="text-2xl">
					{climbed.length} of {towers.length} towers cleared. Pick up where you
					left off.
				</p>
			</div>
			<ul className="grid items-end gap-x-10 gap-y-16 md:grid-cols-3">
				{towers.map((t, i) => {
					const cleared = climbed.includes(t.slug);
					const locked = i > 0 && !climbed.includes(towers[i - 1].slug);
					return (
						<li key={t.slug}>
							<TowerCard
								shape={shapes[i]}
								state={locked ? "locked" : cleared ? "cleared" : "open"}
							>
								<div className="flex flex-col gap-3">
									<h2 className="text-sm">{t.name}</h2>
									<p>{t.summary}</p>
									<Badge>
										{t.lessons.length} lessons, {t.quiz.length} quiz questions
									</Badge>
									{locked ? (
										<Button disabled>Locked</Button>
									) : (
										<Button asChild>
											<Link href={`/tower/${t.slug}`}>
												{cleared ? "Review" : "Start climbing"}
											</Link>
										</Button>
									)}
									{locked && (
										<p className="flex items-center gap-2 text-base">
											<Lock className="h-4 w-4 shrink-0" /> Clear{" "}
											{towers[i - 1].name} to unlock.
										</p>
									)}
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
