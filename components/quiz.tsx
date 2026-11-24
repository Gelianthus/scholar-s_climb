"use client";
import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Question } from "@/lib/towers";

const MAX_HEARTS = 3;

export function Quiz({ questions, onPass, onRetreat }: { questions: Question[]; onPass: () => void; onRetreat: () => void }) {
  const [qi, setQi] = useState(0);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [wrong, setWrong] = useState<number[]>([]);
  const [solved, setSolved] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const q = questions[qi];
  const dead = hearts === 0;

  const pick = (i: number) => {
    if (solved || dead || wrong.includes(i)) return;
    if (i === q.answer) return setSolved(true);
    setWrong((w) => [...w, i]);
    setHearts((h) => h - 1);
    setShakeKey((k) => k + 1);
  };

  const next = () => {
    if (qi + 1 === questions.length) return onPass();
    setQi(qi + 1); setWrong([]); setSolved(false);
  };

  const restart = () => { setQi(0); setHearts(MAX_HEARTS); setWrong([]); setSolved(false); };

  return (
    <section aria-labelledby="quiz-title" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 id="quiz-title" className="text-sm">Question {qi + 1} of {questions.length}</h2>
        <div className="flex gap-1" role="img" aria-label={`${hearts} of ${MAX_HEARTS} hearts left`}>
          {Array.from({ length: MAX_HEARTS }).map((_, i) => (
            <Heart key={i} className={cn("h-7 w-7", i < hearts ? "fill-primary text-primary" : "text-paper")} />
          ))}
        </div>
      </div>

      <div key={shakeKey} className={cn("pixel-frame space-y-4 p-6", shakeKey > 0 && !solved && "shake")}>
        {q.code && (
          <div>
            <p className="mb-1 text-base">Code so far</p>
            <pre className="overflow-x-auto bg-ink p-4 text-lg text-accent">{q.code}</pre>
          </div>
        )}
        <p className="text-2xl">{q.prompt}</p>
        <ul className="space-y-3">
          {q.options.map((opt, i) => {
            const isWrong = wrong.includes(i);
            const isRight = solved && i === q.answer;
            return (
              <li key={i}>
                <button
                  onClick={() => pick(i)}
                  disabled={isWrong || solved || dead}
                  className={cn(
                    "w-full border-4 border-ink p-3 text-left font-body text-xl",
                    "hover:enabled:bg-accent",
                    isRight && "bg-accent",
                    isWrong && "bg-ink text-paper line-through",
                  )}
                >
                  <code>{opt}</code>
                </button>
              </li>
            );
          })}
        </ul>
        {wrong.length > 0 && !solved && !dead && <p>Not quite. You lost a heart. Try another answer.</p>}
        {solved && <p><strong>Correct.</strong> {q.explanation}</p>}
      </div>

      {solved && <Button size="lg" onClick={next}>{qi + 1 === questions.length ? "Finish quiz" : "Next question"}</Button>}
      {dead && (
        <div className="pixel-frame space-y-4 p-6">
          <h3 className="text-sm">Out of hearts</h3>
          <p>You ran out of hearts. Review the lessons or restart the quiz from question 1.</p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={restart}>Restart quiz</Button>
            <Button onClick={onRetreat}>Review lessons</Button>
          </div>
        </div>
      )}
    </section>
  );
}
