"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RequireAuth } from "@/components/require-auth";
import { TowerArt } from "@/components/tower-art";
import { towers } from "@/lib/towers";
import { useAuth, useProgress } from "@/lib/auth";

function Towers() {
  const { user } = useAuth();
  const { climbed } = useProgress();
  return (
    <main className="mx-auto max-w-6xl space-y-10 px-4 pb-16">
      <div className="space-y-2">
        <h1 className="text-xl">Welcome, {user?.name}</h1>
        <p className="text-2xl">{climbed.length} of {towers.length} towers cleared. Pick up where you left off.</p>
      </div>
      <ul className="grid gap-12 md:grid-cols-3">
        {towers.map((t, i) => {
          const cleared = climbed.includes(t.slug);
          const locked = i > 0 && !climbed.includes(towers[i - 1].slug);
          return (
            <li key={t.slug} className="pixel-frame flex flex-col gap-4 p-6">
              <TowerArt floors={t.lessons.length + 1} cleared={cleared} locked={locked} />
              <h2 className="text-sm">{t.name}</h2>
              <p>{t.summary}</p>
              <p className="text-base">{t.lessons.length} lessons, {t.quiz.length} quiz questions</p>
              {locked ? <Button disabled className="mt-auto">Locked</Button>
                : <Button asChild className="mt-auto"><Link href={`/tower/${t.slug}`}>{cleared ? "Review" : "Start climbing"}</Link></Button>}
              {locked && <p className="text-base">Clear {towers[i - 1].name} to unlock.</p>}
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default function TowersPage() { return <RequireAuth><Towers /></RequireAuth>; }
