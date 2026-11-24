import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/logo";
import { TowerArt } from "@/components/tower-art";
import { TowerCard, shapes } from "@/components/tower-card";
import { towers } from "@/lib/towers";
import { currentUser } from "@/lib/server/auth";

export default async function Landing() {
	if (await currentUser()) redirect("/towers");

	return (
		<main className="mx-auto max-w-6xl space-y-24 px-4 pb-16">
			<section className="grid items-center gap-12 py-8 md:grid-cols-2">
				<div className="space-y-6">
					<h1 className="text-2xl leading-relaxed sm:text-3xl">
						Learn IT skills, one floor at a time
					</h1>
					<p className="max-w-prose text-2xl">
						Build real skills in tech from the ground up. Read a clear lesson,
						prove it with a quiz, and unlock the next floor. No experience
						needed, and every tower takes you from beginner toward confident.
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
						className="w-28"
					/>
				</div>
			</section>

			<section
				id="courses"
				className="scroll-mt-8 space-y-10"
			>
				<div className="space-y-3">
					<h2 className="text-xl">Choose your tower</h2>
					<p className="max-w-prose text-2xl">
						Each tower is a subject. Every floor has short lessons and a quiz,
						and passing a quiz unlocks the next, harder floor. More towers are
						on the way.
					</p>
				</div>
				<ul className="grid items-end gap-x-10 gap-y-16 md:grid-cols-3">
					{towers.map((t, i) => (
						<li key={t.slug}>
							<TowerCard
								shape={shapes[i]}
								state="open"
							>
								<div className="flex flex-col gap-3">
									<Badge>{t.level}</Badge>
									<h3 className="text-base">{t.name}</h3>
									<p>{t.summary}</p>
									<ol className="list-decimal space-y-1 pl-6">
										{t.floors.map((f) => (
											<li key={f.title}>{f.title}</li>
										))}
									</ol>
								</div>
							</TowerCard>
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
				<p className="text-2xl">
					Create a free account and pick your first tower.
				</p>
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
