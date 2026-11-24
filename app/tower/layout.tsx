import { TowerWalls } from "@/components/tower-walls";

export default function TowerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<TowerWalls />
			{children}
		</>
	);
}
