"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function PasswordInput({
	className,
	...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
	const [show, setShow] = useState(false);
	return (
		<div className="relative">
			<Input
				{...props}
				type={show ? "text" : "password"}
				className={cn("pr-14", className)}
			/>
			<button
				type="button"
				onClick={() => setShow((s) => !s)}
				aria-label={show ? "Hide password" : "Show password"}
				aria-pressed={show}
				className="absolute bottom-1 right-1 top-1 flex w-12 items-center justify-center text-ink hover:bg-accent"
			>
				{show ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
			</button>
		</div>
	);
}
