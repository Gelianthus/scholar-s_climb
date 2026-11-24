import { cn } from "@/lib/utils";

export type TowerShape = "keep" | "turret" | "spire";
export type TowerState = "open" | "cleared" | "locked";

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

export function TowerCard({
	shape,
	state,
	className,
	bodyClassName,
	children,
}: {
	shape: TowerShape;
	state: TowerState;
	className?: string;
	bodyClassName?: string;
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
					className="mx-auto h-20 w-4/5"
					aria-hidden
					style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
				>
					<div className={cn("h-full w-full", wall)} />
				</div>
			)}

			<div className={cn("text-ink", wall)}>
				<div
					className={bodyClassName}
					style={
						bodyClassName ? undefined : { padding: "1.25rem 1.25rem 1.5rem" }
					}
				>
					{children}
				</div>
				<div
					aria-hidden
					className="relative"
					style={{
						height: "3.5rem",
						backgroundImage:
							"linear-gradient(#000000 3px, transparent 3px), linear-gradient(90deg, #000000 3px, transparent 3px)",
						backgroundSize: "40px 28px",
					}}
				>
					<div
						className="absolute bg-ink"
						style={{
							bottom: 0,
							left: "50%",
							width: "2.25rem",
							height: "2.5rem",
							transform: "translateX(-50%)",
							borderRadius: "18px 18px 0 0",
						}}
					/>
				</div>
			</div>
		</div>
	);
}
