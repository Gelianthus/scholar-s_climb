type Patch = { top: string; w: number; h: number; clip: string };

const left: Patch[] = [
	{
		top: "10%",
		w: 150,
		h: 190,
		clip: "polygon(0 0, 100% 0, 100% 55%, 82% 55%, 82% 78%, 58% 78%, 58% 100%, 0 100%)",
	},
	{
		top: "64%",
		w: 104,
		h: 120,
		clip: "polygon(0 0, 70% 0, 70% 30%, 100% 30%, 100% 100%, 0 100%)",
	},
];
const right: Patch[] = [
	{
		top: "28%",
		w: 128,
		h: 200,
		clip: "polygon(0 0, 100% 0, 100% 100%, 40% 100%, 40% 68%, 0 68%)",
	},
	{
		top: "76%",
		w: 172,
		h: 108,
		clip: "polygon(30% 0, 100% 0, 100% 100%, 0 100%, 0 45%, 30% 45%)",
	},
];

function Gutter({
	side,
	patches,
}: {
	side: "left" | "right";
	patches: Patch[];
}) {
	return (
		<div
			className={`absolute inset-y-0 overflow-hidden ${side === "left" ? "left-0" : "right-0"}`}
			style={{ width: "calc(50% - min(35vw, 29rem) - 2rem)" }}
		>
			{patches.map((p) => (
				<div
					key={p.top}
					className={`brick-patch absolute ${side === "left" ? "left-0" : "right-0"}`}
					style={{ top: p.top, width: p.w, height: p.h, clipPath: p.clip }}
				/>
			))}
		</div>
	);
}

export function TowerWalls() {
	return (
		<div
			aria-hidden
			className="pointer-events-none fixed inset-0 -z-10 hidden xl:block"
		>
			<Gutter
				side="left"
				patches={left}
			/>
			<Gutter
				side="right"
				patches={right}
			/>
		</div>
	);
}
