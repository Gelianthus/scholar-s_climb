import Link from "next/link";
import { redirect } from "next/navigation";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { TowerArt } from "@/components/tower-art";
import { towers } from "@/lib/towers";
import { currentUser } from "@/lib/server/auth";

export default async function Landing() {
	if (await currentUser()) redirect("/towers");

	return (
		<main className="mx-auto max-w-6xl space-y-24 px-4 pb-16">
			<section className="grid items-center gap-12 py-8 md:grid-cols-2">
				<div className="space-y-6">
					<h1 className="text-2xl leading-relaxed sm:text-3xl">
						Go from zero to building real websites
					</h1>
					<p className="max-w-prose text-2xl">
						Learn HTML, CSS and JavaScript in the order professionals use them.
						Read a clear lesson, prove it with a quiz, and unlock the next
						course. No experience needed, and you finish able to build and ship
						your own pages.
					</p>
					<div className="flex flex-wrap gap-4">
						<Button
							asChild
							size="lg"
						>
							<Link href="/signup">Join the crusade</Link>
						</Button>
						<Button
							asChild
							size="lg"
							variant="light"
						>
							<Link href="#courses">See the courses</Link>
						</Button>
					</div>
				</div>
				<div
					className="flex items-end justify-center gap-4"
					aria-hidden
				>
					<TowerArt
						floors={3}
						cleared
						className="w-28"
					/>
					<TowerArt
						floors={4}
						className="w-28"
					/>
					<TowerArt
						floors={5}
						locked
						className="w-28"
					/>
				</div>
			</section>

			<section
				id="courses"
				className="scroll-mt-8 space-y-10"
			>
				<div className="space-y-3">
					<h2 className="text-xl">Three courses, one path</h2>
					<p className="max-w-prose text-2xl">
						Each course builds on the last. Pass a course&apos;s quiz to unlock
						the next one.
					</p>
				</div>
				<ul className="grid gap-12 md:grid-cols-3">
					{towers.map((t, i) => (
						<li
							key={t.slug}
							className="pixel-frame flex flex-col gap-4 p-6"
						>
							<p className="text-base">
								Course {i + 1} · {t.level}
							</p>
							<h3 className="text-lg">{t.name}</h3>
							<p>{t.summary}</p>
							<ul className="list-disc space-y-1 pl-6">
								{t.outcomes.map((o) => (
									<li key={o}>{o}</li>
								))}
							</ul>
							<p className="mt-auto flex items-center gap-2 text-base">
								{i > 0 && <Lock className="h-4 w-4" />}
								{t.lessons.length} lessons, {t.quiz.length} quiz questions
								{i > 0 && `, unlocks after ${towers[i - 1].name}`}
							</p>
						</li>
					))}
				</ul>
			</section>

			<section className="pixel-frame space-y-4 p-8 text-center">
				<Logo
					size={88}
					className="mx-auto"
				/>
				<h2 className="text-lg">Ready to start climbing?</h2>
				<p className="text-2xl">Create a free account and begin with HTML.</p>
				<Button
					asChild
					size="lg"
				>
					<Link href="/signup">Join the crusade</Link>
				</Button>
			</section>
		</main>
	);
}
