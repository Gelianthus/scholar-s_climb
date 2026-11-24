import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export function TowerArt({ floors, cleared, locked, className }: { floors: number; cleared?: boolean; locked?: boolean; className?: string }) {
  const wall = locked ? "bg-paper" : cleared ? "bg-accent" : "bg-primary";
  return (
    <div className={cn("mx-auto flex w-40 flex-col items-stretch", className)} aria-hidden>
      <div className="mx-auto flex h-14 items-end">
        {cleared && (
          <div className="flex items-start">
            <div className="h-14 w-1 bg-paper" />
            <div className="h-5 w-8 bg-accent" />
          </div>
        )}
      </div>
      <div className="flex justify-between">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className={cn("h-5 w-5", i % 2 === 0 ? wall : "bg-transparent")} />
        ))}
      </div>
      {Array.from({ length: floors }).map((_, i) => (
        <div key={i} className={cn("brick relative flex h-14 items-center justify-center border-x-4", wall)}>
          {locked && i === 0 ? <Lock className="h-6 w-6 text-ink" /> : <div className="h-6 w-4 bg-ink" />}
        </div>
      ))}
      <div className={cn("brick relative flex h-14 items-end justify-center border-x-4", wall)}>
        <div className="h-10 w-10 bg-ink" style={{ borderRadius: "20px 20px 0 0" }} />
      </div>
    </div>
  );
}
