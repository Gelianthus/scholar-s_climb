"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProgress } from "@/lib/auth";
import { isFloorCleared, type Tower } from "@/lib/towers";

export function TowerEntry({ tower }: { tower: Tower }) {
	const { climbed, ready } = useProgress();
	const router = useRouter();

	useEffect(() => {
		if (!ready) return;
		let i = 0;
		while (i < tower.floors.length - 1 && isFloorCleared(tower, i, climbed))
			i++;
		router.replace(`/tower/${tower.slug}/${i + 1}`);
	}, [ready, climbed, tower, router]);

	return (
		<p
			role="status"
			className="px-4 py-8 text-center"
		>
			Entering tower...
		</p>
	);
}
