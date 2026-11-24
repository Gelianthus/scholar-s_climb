import Link from "next/link";
import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";

const link = "hover:text-accent hover:underline";

export function SiteFooter() {
	return (
		<footer className="mt-24 bg-background">
			<Separator />
			<div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:grid-cols-[1.5fr_1fr_1fr]">
				<div className="space-y-3">
					<Link
						href="/"
						className="flex items-center gap-3 text-primary hover:text-accent"
					>
						<Logo size={40} />
						<span className="font-pixel text-sm">Scholar&apos;s Climb</span>
					</Link>
					<p className="max-w-xs">
						Learn IT skills one floor at a time. Read, prove it, and climb.
					</p>
				</div>

				<nav
					aria-label="Explore"
					className="space-y-3"
				>
					<h2 className="font-pixel text-xs text-primary">Explore</h2>
					<ul className="space-y-2">
						<li>
							<Link
								href="/towers"
								className={link}
							>
								My towers
							</Link>
						</li>
						<li>
							<Link
								href="/about#how-it-works"
								className={link}
							>
								How it works
							</Link>
						</li>
						<li>
							<Link
								href="/about#faq"
								className={link}
							>
								FAQ
							</Link>
						</li>
					</ul>
				</nav>

				<nav
					aria-label="Company"
					className="space-y-3"
				>
					<h2 className="font-pixel text-xs text-primary">
						Scholar&apos;s Climb
					</h2>
					<ul className="space-y-2">
						<li>
							<Link
								href="/about"
								className={link}
							>
								About
							</Link>
						</li>
						<li>
							<Link
								href="/login"
								className={link}
							>
								Log in
							</Link>
						</li>
						<li>
							<Link
								href="/signup"
								className={link}
							>
								Join the crusade
							</Link>
						</li>
					</ul>
				</nav>
			</div>
			<Separator className="h-0.5" />
			<p className="mx-auto max-w-6xl px-4 py-5 text-base">
				&copy; {new Date().getFullYear()} Scholar&apos;s Climb. All rights
				reserved.
			</p>
		</footer>
	);
}
