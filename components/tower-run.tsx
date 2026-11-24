"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/quiz";
import { TowerArt } from "@/components/tower-art";
import { DoorsIcon, IconNav, StairsIcon } from "@/components/tower-icons";
import { useProgress } from "@/lib/auth";
import { cn } from "@/lib/utils";
import {
	floorKey,
	isFloorCleared,
	isFloorUnlocked,
	type Tower,
} from "@/lib/towers";

export function TowerRun({
	tower,
	floorIndex,
}: {
	tower: Tower;
	floorIndex: number;
}) {
	const { climbed, climb, ready } = useProgress();
	const router = useRouter();
	const floor = tower.floors[floorIndex];
	const total = tower.floors.length;
	const [step, setStep] = useState(-1);
	const n = floor.lessons.length;
	const lesson = floor.lessons[step];
	const hasNext = floorIndex < total - 1;

	const locked = ready && !isFloorUnlocked(tower, floorIndex, climbed);
	const cleared = isFloorCleared(tower, floorIndex, climbed);
	useEffect(() => {
		if (locked) router.replace(`/tower/${tower.slug}`);
	}, [locked, router, tower.slug]);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [step]);
	if (!ready || locked) return null;

	const exit = (
		<IconNav
			label="Exit tower"
			short="Exit"
			href="/towers"
		>
			<DoorsIcon />
		</IconNav>
	);
	const up =
		hasNext && cleared ? (
			<IconNav
				label={`Go up to floor ${floorIndex + 2}`}
				short="Up"
				href={`/tower/${tower.slug}/${floorIndex + 2}`}
			>
				<StairsIcon direction="up" />
			</IconNav>
		) : (
			<IconNav
				label="Go up"
				short="Up"
				hint={
					hasNext
						? "Pass this floor's quiz to unlock the next floor"
						: "You are on the top floor"
				}
			>
				<StairsIcon direction="up" />
			</IconNav>
		);
	const down =
		floorIndex > 0 ? (
			<IconNav
				label={`Go down to floor ${floorIndex}`}
				short="Down"
				href={`/tower/${tower.slug}/${floorIndex}`}
			>
				<StairsIcon direction="down" />
			</IconNav>
		) : (
			<IconNav
				label="Go down"
				short="Down"
				hint="You are on the ground floor"
			>
				<StairsIcon direction="down" />
			</IconNav>
		);

	return (
		<main className="game-column mx-auto grid gap-4 px-4 pb-16">
			<nav
				aria-label="Tower navigation"
				className="flex items-start justify-between sm:hidden"
			>
				{exit}
				<div className="flex gap-4">
					{down}
					{up}
				</div>
			</nav>

			<aside
				className="sticky top-6 hidden self-start sm:block"
				aria-label="Leave the tower"
			>
				{exit}
			</aside>

			<div className="min-w-0 space-y-8">
				{step === -1 && (
					<section className="pixel-frame space-y-5 p-6 text-center sm:p-8">
						<Badge>
							{tower.name} tower · Floor {floorIndex + 1} of {total}
							{cleared ? " · Cleared" : ""}
						</Badge>
						<h1 className="text-xl leading-relaxed sm:text-2xl">
							Welcome to Floor {floorIndex + 1}
						</h1>
						<h2 className="text-sm">{floor.title}</h2>
						<p className="text-2xl">{floor.summary}</p>
						<p className="text-base">
							{floor.lessons.length} lessons, {floor.quiz.length} quiz questions
						</p>
						<Button
							size="lg"
							onClick={() => setStep(0)}
						>
							{cleared ? "Review lessons" : "Start floor"}
						</Button>
						<p className="text-base">
							{cleared
								? hasNext
									? "Take the stairs up when you are ready."
									: "You are at the top of this tower."
								: hasNext
									? "Pass the quiz to unlock the stairs to the next floor."
									: "This is the top floor of the tower."}
						</p>
					</section>
				)}

				{step >= 0 && step <= n && (
					<header className="space-y-3 bg-ink p-4">
						<h1 className="text-sm text-primary sm:text-base">
							{tower.name}, floor {floorIndex + 1}: {floor.title}
						</h1>
						<ol
							className="flex gap-2"
							aria-label="Progress"
						>
							{[...floor.lessons.map((l) => l.title), "Quiz"].map(
								(label, i) => (
									<li
										key={label}
										title={label}
										aria-current={i === step ? "step" : undefined}
										className={cn(
											"h-3 flex-1",
											i < step
												? "bg-primary"
												: i === step
													? "bg-accent"
													: "bg-paper",
										)}
									/>
								),
							)}
						</ol>
					</header>
				)}

				{step >= 0 && step < n && (
					<section className="space-y-6">
						<article className="pixel-frame space-y-4 p-6">
							<p className="text-base">
								Lesson {step + 1} of {n}
							</p>
							<h2 className="text-lg">{lesson.title}</h2>
							{lesson.blocks.map((b, i) =>
								b.t === "h" ? (
									<h3
										key={i}
										className="pt-2 text-sm"
									>
										{b.text}
									</h3>
								) : b.t === "code" ? (
									<pre
										key={i}
										className="overflow-x-auto bg-ink p-4 text-lg text-accent"
									>
										{b.text}
									</pre>
								) : (
									<p
										key={i}
										className="max-w-prose text-2xl"
									>
										{b.text}
									</p>
								),
							)}
						</article>
						<div className="flex gap-3">
							<Button
								variant="light"
								onClick={() => setStep(step - 1)}
							>
								Back
							</Button>
							<Button onClick={() => setStep(step + 1)}>
								{step + 1 === n ? "Take the quiz" : "Next lesson"}
							</Button>
						</div>
					</section>
				)}

				{step === n && (
					<Quiz
						questions={floor.quiz}
						onRetreat={() => setStep(0)}
						onPass={() => {
							climb(floorKey(tower.slug, floorIndex));
							setStep(n + 1);
						}}
					/>
				)}

				{step > n && (
					<section className="pixel-frame space-y-6 p-6 text-center">
						<TowerArt
							floors={floorIndex + 1}
							cleared
						/>
						<h2 className="text-lg">Floor {floorIndex + 1} cleared</h2>
						<p className="text-2xl">
							{hasNext
								? `Floor ${floorIndex + 2}: ${tower.floors[floorIndex + 1].title} is now unlocked. Take the stairs up.`
								: `You have reached the top of the ${tower.name} tower. Well done.`}
						</p>
						<div className="flex flex-wrap justify-center gap-3">
							{hasNext && (
								<Button
									asChild
									size="lg"
								>
									<Link href={`/tower/${tower.slug}/${floorIndex + 2}`}>
										Go to floor {floorIndex + 2}
									</Link>
								</Button>
							)}
							<Button
								asChild
								size="lg"
								variant={hasNext ? "light" : "default"}
							>
								<Link href="/towers">Exit tower</Link>
							</Button>
						</div>
					</section>
				)}
			</div>

			<aside
				className="sticky top-6 hidden flex-col gap-4 self-start sm:flex"
				aria-label="Change floor"
			>
				{up}
				{down}
			</aside>
		</main>
	);
}
