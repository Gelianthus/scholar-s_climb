import Link from "next/link";

export function StairsIcon({ direction }: { direction: "up" | "down" }) {
	return (
		<svg
			viewBox="0 0 16 16"
			className="h-8 w-8"
			fill="currentColor"
			shapeRendering="crispEdges"
			aria-hidden
			style={{ transform: direction === "down" ? "scaleX(-1)" : undefined }}
		>
			<path d="M2 14V11h3V8h3V5h3V2h3v12z" />
		</svg>
	);
}

export function DoorsIcon() {
	return (
		<svg
			viewBox="0 0 16 16"
			className="h-8 w-8"
			fill="currentColor"
			shapeRendering="crispEdges"
			aria-hidden
		>
			<path
				fillRule="evenodd"
				d="M1 2h14v1H1z M2 3h5v11H2z M5 8h1v2H5z M9 3h5v11H9z M10 8h1v2h-1z"
			/>
		</svg>
	);
}

export function IconNav({
	label,
	short,
	href,
	hint,
	children,
}: {
	label: string;
	short: string;
	href?: string;
	hint?: string;
	children: React.ReactNode;
}) {
	const cls = "pixel-btn flex h-14 w-14 items-center justify-center";
	return (
		<div className="flex flex-col items-center gap-1 text-center">
			{href ? (
				<Link
					href={href}
					aria-label={label}
					title={label}
					className={cls}
				>
					{children}
				</Link>
			) : (
				<button
					type="button"
					disabled
					aria-label={`${label} (unavailable)`}
					title={hint ?? label}
					className={cls}
				>
					{children}
				</button>
			)}
			<span className="text-base leading-none">{short}</span>
		</div>
	);
}
