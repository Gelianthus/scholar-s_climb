import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn("h-12 w-full border-4 border-ink bg-paper px-3 font-body text-xl text-ink focus:bg-accent", className)} {...props} />
  ),
);
Input.displayName = "Input";
