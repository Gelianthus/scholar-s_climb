import { cn } from "@/lib/utils";

export type TowerShape = "keep" | "turret" | "spire";
export type TowerState = "open" | "cleared" | "locked";

/** Each course gets its own silhouette, by position in the list. */
export const shapes: TowerShape[] = ["keep", "turret", "spire"];

const wallFor: Record<TowerState, string> = {
	open: "bg-primary",
	cleared: "bg-accent",
	locked: "bg-paper",
};

function Crenels({ n, wall }: { n: number; wall: string }) {
	const cols = n * 2 - 1;
	return (
		<div
			className="grid h-5"
			style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
			aria-hidden
		>
			{Array.from({ length: cols }).map((_, i) => (
				<div
					key={i}
					className={i % 2 === 0 ? wall : undefined}
				/>
			))}
		</div>
	);
}

function Flag() {
	return (
		<div
			className="mx-auto flex h-10 items-start"
			aria-hidden
		>
			<div className="h-10 w-1 bg-paper" />
			<div className="h-4 w-7 bg-accent" />
		</div>
	);
}

/** A course card shaped like a tower: the card itself is the tower, and its content sits inside the wall. */
export function TowerCard({
	shape,
	state,
	className,
	children,
}: {
	shape: TowerShape;
	state: TowerState;
	className?: string;
	children: React.ReactNode;
}) {
	const wall = wallFor[state];
	return (
		<div className={cn("mx-auto flex w-full flex-col", className)}>
			{state === "cleared" && <Flag />}

			{shape === "keep" && (
				<Crenels
					n={5}
					wall={wall}
				/>
			)}

			{shape === "turret" && (
				<div
					className="mx-auto w-2/3"
					aria-hidden
				>
					<Crenels
						n={3}
						wall={wall}
					/>
					<div
						className={cn("flex h-12 items-center justify-center gap-8", wall)}
					>
						<span className="h-5 w-3 bg-ink" />
						<span className="h-5 w-3 bg-ink" />
					</div>
				</div>
			)}

			{shape === "spire" && (
				<div
					className="mx-auto flex h-20 w-4/5 items-end justify-center"
					aria-hidden
					style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
				>
					<div className={cn("absolute inset-0", wall)} />
				</div>
			)}

			<div className={cn("relative px-5 pb-[4.5rem] pt-5 text-ink", wall)}>
				{children}
				{/* Stone base with a gate */}
				<div
					className="brick absolute inset-x-0 bottom-0 h-14"
					aria-hidden
				/>
				<div
					className="absolute bottom-0 left-1/2 h-10 w-9 -translate-x-1/2 bg-ink"
					style={{ borderRadius: "18px 18px 0 0" }}
					aria-hidden
				/>
			</div>
		</div>
	);
}
