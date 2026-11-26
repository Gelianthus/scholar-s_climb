"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";
import { PasswordInput } from "@/components/password-input";
import { useAuth } from "@/lib/auth";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
	const signup = mode === "signup";
	const router = useRouter();
	const { user, signUp, logIn } = useAuth();
	const [error, setError] = useState<string | null>(null);
	const [pending, setPending] = useState(false);

	useEffect(() => {
		if (user) router.replace("/towers");
	}, [user, router]);

	const submit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const f = new FormData(e.currentTarget);
		const name = String(f.get("name") ?? "").trim();
		const email = String(f.get("email")).trim();
		const password = String(f.get("password"));
		const confirm = String(f.get("confirm") ?? "");
		setError(null);
		if (signup && password !== confirm)
			return setError("Passwords do not match.");
		setPending(true);
		const err = signup
			? await signUp(name, email, password)
			: await logIn(email, password);
		setPending(false);
		if (err) return setError(err);
		router.push("/towers");
	};

	return (
		<main className="mx-auto max-w-md px-4 py-12">
			<form
				onSubmit={submit}
				className="pixel-frame space-y-5 p-6"
			>
				<Logo
					size={72}
					className="mx-auto"
				/>
				<h1 className="text-center text-lg">
					{signup ? "Join the crusade" : "Return to the realm"}
				</h1>
				<p className="text-center text-2xl">
					{signup
						? "Create your account and start climbing."
						: "Log in to pick up where you left off."}
				</p>
				{signup && (
					<div className="space-y-1">
						<label htmlFor="name">Name</label>
						<Input
							id="name"
							name="name"
							autoComplete="name"
							required
							maxLength={60}
						/>
					</div>
				)}
				<div className="space-y-1">
					<label htmlFor="email">Email</label>
					<Input
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						required
					/>
				</div>
				<div className="space-y-1">
					<div className="flex items-baseline justify-between gap-3">
						<label htmlFor="password">Password</label>
						{!signup && (
							<Link
								href="/forgot-password"
								className="text-base underline hover:bg-accent"
							>
								Forgot password?
							</Link>
						)}
					</div>
					<PasswordInput
						id="password"
						name="password"
						autoComplete={signup ? "new-password" : "current-password"}
						required
						minLength={signup ? 8 : undefined}
					/>
					{signup && <p className="text-base">At least 8 characters.</p>}
				</div>
				{signup && (
					<div className="space-y-1">
						<label htmlFor="confirm">Confirm password</label>
						<PasswordInput
							id="confirm"
							name="confirm"
							autoComplete="new-password"
							required
						/>
					</div>
				)}
				{error && (
					<p
						role="alert"
						className="bg-ink p-2 text-paper"
					>
						{error}
					</p>
				)}
				<Button
					type="submit"
					size="lg"
					className="w-full"
					disabled={pending}
				>
					{pending ? "Please wait..." : signup ? "Create account" : "Log in"}
				</Button>
				<p>
					{signup ? "Already have an account? " : "New here? "}
					<Link
						href={signup ? "/login" : "/signup"}
						className="underline hover:bg-accent"
					>
						{signup ? "Log in" : "Join the crusade"}
					</Link>
				</p>
			</form>
		</main>
	);
}
