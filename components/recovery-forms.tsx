"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";
import { PasswordInput } from "@/components/password-input";
import { forgotPassword, resetPassword } from "@/lib/auth";

export function ForgotPasswordForm() {
	const [error, setError] = useState<string | null>(null);
	const [pending, setPending] = useState(false);
	const [sent, setSent] = useState<{
		email: string;
		devResetLink?: string;
	} | null>(null);

	const submit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const email = String(new FormData(e.currentTarget).get("email")).trim();
		setError(null);
		setPending(true);
		const res = await forgotPassword(email);
		setPending(false);
		if (res.error) return setError(res.error);
		setSent({ email, devResetLink: res.devResetLink });
	};

	return (
		<main className="mx-auto max-w-md px-4 py-12">
			<div className="pixel-frame space-y-5 p-6">
				<Logo
					size={72}
					className="mx-auto"
				/>
				<h1 className="text-center text-lg">Forgot your password?</h1>
				{sent ? (
					<div className="space-y-4">
						<p className="text-2xl">
							If an account exists for {sent.email}, we have sent a link to
							reset the password. The link works for 15 minutes.
						</p>
						{sent.devResetLink && (
							<p className="bg-ink p-3 text-paper">
								Development only: no email is sent, so use this link instead:{" "}
								<Link
									href={sent.devResetLink}
									className="text-accent underline"
								>
									Reset my password
								</Link>
							</p>
						)}
						<Link
							href="/login"
							className="inline-block underline hover:bg-accent"
						>
							Back to log in
						</Link>
					</div>
				) : (
					<form
						onSubmit={submit}
						className="space-y-5"
					>
						<p className="text-center text-2xl">
							Enter your email and we will send you a link to choose a new one.
						</p>
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
							{pending ? "Please wait..." : "Send reset link"}
						</Button>
						<Link
							href="/login"
							className="inline-block underline hover:bg-accent"
						>
							Back to log in
						</Link>
					</form>
				)}
			</div>
		</main>
	);
}

export function ResetPasswordForm({ token }: { token?: string }) {
	const [error, setError] = useState<string | null>(null);
	const [pending, setPending] = useState(false);
	const [done, setDone] = useState(false);

	const submit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const f = new FormData(e.currentTarget);
		const password = String(f.get("password"));
		if (password !== String(f.get("confirm")))
			return setError("Passwords do not match.");
		setError(null);
		setPending(true);
		const err = await resetPassword(token ?? "", password);
		setPending(false);
		if (err) return setError(err);
		setDone(true);
	};

	return (
		<main className="mx-auto max-w-md px-4 py-12">
			<div className="pixel-frame space-y-5 p-6">
				<Logo
					size={72}
					className="mx-auto"
				/>
				<h1 className="text-center text-lg">Choose a new password</h1>
				{done ? (
					<div className="space-y-4 text-center">
						<p className="text-2xl">
							Your password has been updated. Log in with your new password.
						</p>
						<Button
							asChild
							size="lg"
						>
							<Link href="/login">Log in</Link>
						</Button>
					</div>
				) : !token ? (
					<div className="space-y-4">
						<p className="text-2xl">This reset link is missing or invalid.</p>
						<Link
							href="/forgot-password"
							className="inline-block underline hover:bg-accent"
						>
							Request a new link
						</Link>
					</div>
				) : (
					<form
						onSubmit={submit}
						className="space-y-5"
					>
						<div className="space-y-1">
							<label htmlFor="password">New password</label>
							<PasswordInput
								id="password"
								name="password"
								autoComplete="new-password"
								required
								minLength={8}
							/>
							<p className="text-base">At least 8 characters.</p>
						</div>
						<div className="space-y-1">
							<label htmlFor="confirm">Confirm new password</label>
							<PasswordInput
								id="confirm"
								name="confirm"
								autoComplete="new-password"
								required
							/>
						</div>
						{error && (
							<p
								role="alert"
								className="bg-ink p-2 text-paper"
							>
								{error}{" "}
								{error.includes("expired") && (
									<Link
										href="/forgot-password"
										className="text-accent underline"
									>
										Request a new link
									</Link>
								)}
							</p>
						)}
						<Button
							type="submit"
							size="lg"
							className="w-full"
							disabled={pending}
						>
							{pending ? "Please wait..." : "Update password"}
						</Button>
					</form>
				)}
			</div>
		</main>
	);
}
