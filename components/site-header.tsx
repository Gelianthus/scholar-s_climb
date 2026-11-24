"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { useAuth } from "@/lib/auth";

export function SiteHeader() {
	const { user, ready, logOut } = useAuth();
	const router = useRouter();
	return (
		<div className="bg-background">
			<header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6">
				<Link
					href="/"
					className="flex items-center gap-3 text-primary hover:text-accent"
				>
					<Logo size={44} />
					<span className="font-pixel text-sm">Scholar&apos;s Climb</span>
				</Link>
				<nav
					className="flex items-center gap-4"
					aria-label="Main"
				>
					{ready && user ? (
						<>
							<Link
								href="/towers"
								className="hover:text-accent hover:underline"
							>
								My towers
							</Link>
							<span className="hidden sm:inline">{user.name}</span>
							<Button
								size="sm"
								variant="light"
								onClick={async () => {
									await logOut();
									router.push("/");
								}}
							>
								Log out
							</Button>
						</>
					) : (
						<>
							<Link
								href="/login"
								className="hover:text-accent hover:underline"
							>
								Log in
							</Link>
							<Button
								asChild
								size="sm"
							>
								<Link href="/signup">Join</Link>
							</Button>
						</>
					)}
				</nav>
			</header>
		</div>
	);
}
