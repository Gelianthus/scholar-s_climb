import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { currentUser } from "@/lib/server/auth";

export const metadata = { title: "About | Scholar's Climb" };

const steps = [
	{
		title: "Read",
		text: "Each floor starts with short, focused lessons that cover what matters most.",
	},
	{
		title: "Prove it",
		text: "A quiz follows, where each question builds on the one before it.",
	},
	{
		title: "Climb",
		text: "Pass the quiz to unlock the stairs to the next, harder floor.",
	},
];

const faqs = [
	{
		q: "What is a tower?",
		a: "A tower is one subject. Each tower has floors, and each floor has a few lessons and a quiz. Towers are open to everyone, so you can start with any subject you like.",
	},
	{
		q: "How do floors unlock?",
		a: "Floor 1 is open from the start. Passing a floor's quiz unlocks the stairs to the next floor, so the material gets harder as you climb.",
	},
	{
		q: "What are the hearts for?",
		a: "You have three hearts for each quiz. A wrong answer costs one. If you run out, you can review the lessons or restart the quiz as many times as you like.",
	},
	{
		q: "What can I learn here?",
		a: "Right now the towers cover the basics of building for the web. More IT topics are planned, and new towers will appear on your dashboard as they are added.",
	},
	{
		q: "Is my progress saved?",
		a: "Yes, on the device and browser you use. Syncing progress across devices is planned for later.",
	},
];

export default async function AboutPage() {
	const user = await currentUser();
	return (
		<main className="mx-auto max-w-4xl space-y-16 px-4 pb-8">
			<section className="space-y-4">
				<h1 className="text-2xl leading-relaxed">About Scholar&apos;s Climb</h1>
				<p className="max-w-prose text-2xl">
					Scholar&apos;s Climb is a place to learn IT skills step by step. Every
					subject is a tower, and you climb it by learning a little, proving it,
					and moving up. We keep lessons short and focused, because the most
					useful things to know are rarely the longest.
				</p>
			</section>

			<section
				id="how-it-works"
				className="scroll-mt-8 space-y-6"
			>
				<h2 className="text-lg">How it works</h2>
				<ol className="grid gap-10 sm:grid-cols-3">
					{steps.map((s, i) => (
						<li
							key={s.title}
							className="pixel-frame space-y-2 p-5"
						>
							<p className="text-base">Step {i + 1}</p>
							<h3 className="text-sm">{s.title}</h3>
							<p>{s.text}</p>
						</li>
					))}
				</ol>
			</section>

			<section
				id="faq"
				className="scroll-mt-8 space-y-6"
			>
				<h2 className="text-lg">Frequently asked questions</h2>
				<div className="pixel-frame p-4">
					<Accordion
						type="single"
						collapsible
					>
						{faqs.map((f, i) => (
							<AccordionItem
								key={f.q}
								value={`item-${i}`}
							>
								<AccordionTrigger>{f.q}</AccordionTrigger>
								<AccordionContent>{f.a}</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</section>

			<section className="flex flex-wrap items-center gap-4">
				<Button
					asChild
					size="lg"
				>
					<Link href={user ? "/towers" : "/signup"}>
						{user ? "Go to my towers" : "Join the crusade"}
					</Link>
				</Button>
			</section>
		</main>
	);
}
