"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/quiz";
import { TowerArt } from "@/components/tower-art";
import { useProgress } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { towers, type Tower } from "@/lib/towers";

export function TowerRun({ tower }: { tower: Tower }) {
  const { climbed, climb, ready } = useProgress();
  const router = useRouter();
  const [step, setStep] = useState(0); // 0..n-1 lessons, n = quiz, n+1 = cleared
  const n = tower.lessons.length;
  const lesson = tower.lessons[step];

  const idx = towers.findIndex((t) => t.slug === tower.slug);
  const locked = ready && idx > 0 && !climbed.includes(towers[idx - 1].slug);
  useEffect(() => { if (locked) router.replace("/towers"); }, [locked, router]);
  useEffect(() => { window.scrollTo(0, 0); }, [step]);
  if (!ready || locked) return null;

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 pb-16">
      <header className="space-y-4">
        <Link href="/towers" className="inline-block text-primary hover:text-accent hover:underline">Back to my towers</Link>
        <h1 className="text-xl text-primary sm:text-2xl">{tower.name}</h1>
        <ol className="flex gap-2" aria-label="Progress">
          {[...tower.lessons.map((l) => l.title), "Quiz"].map((label, i) => (
            <li key={label} title={label} aria-current={i === step ? "step" : undefined}
              className={cn("h-3 flex-1", i < step ? "bg-primary" : i === step ? "bg-accent" : "bg-paper")} />
          ))}
        </ol>
      </header>

      {step < n && (
        <section className="space-y-6">
          <article className="pixel-frame space-y-4 p-6">
            <p className="text-base">Lesson {step + 1} of {n}</p>
            <h2 className="text-lg">{lesson.title}</h2>
            {lesson.blocks.map((b, i) =>
              b.t === "h" ? <h3 key={i} className="pt-2 text-sm">{b.text}</h3>
              : b.t === "code" ? <pre key={i} className="overflow-x-auto bg-ink p-4 text-lg text-accent">{b.text}</pre>
              : <p key={i} className="max-w-prose text-2xl">{b.text}</p>,
            )}
          </article>
          <div className="flex gap-3">
            {step > 0 && <Button variant="light" onClick={() => setStep(step - 1)}>Back</Button>}
            <Button onClick={() => setStep(step + 1)}>{step + 1 === n ? "Take the quiz" : "Next lesson"}</Button>
          </div>
        </section>
      )}

      {step === n && (
        <Quiz questions={tower.quiz} onRetreat={() => setStep(0)} onPass={() => { climb(tower.slug); setStep(n + 1); }} />
      )}

      {step > n && (
        <section className="pixel-frame space-y-6 p-6 text-center">
          <TowerArt floors={n + 1} cleared />
          <h2 className="text-lg">{tower.name} cleared</h2>
          <p className="text-2xl">
            {idx < towers.length - 1 ? `${towers[idx + 1].name} is now unlocked.` : "You have finished every course. Well done."}
          </p>
          <Button asChild size="lg"><Link href="/towers">Back to my towers</Link></Button>
        </section>
      )}
    </main>
  );
}
