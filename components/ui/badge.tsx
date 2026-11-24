import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex w-fit shrink-0 items-center gap-1 whitespace-nowrap border-2 border-ink px-2 py-0.5 font-body text-base [&>svg]:size-3",
	{
		variants: {
			variant: {
				default: "bg-ink text-paper",
				secondary: "bg-paper text-ink",
			},
		},
		defaultVariants: { variant: "default" },
	},
);

function Badge({
	className,
	variant,
	asChild = false,
	...props
}: React.ComponentProps<"span"> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "span";
	return (
		<Comp
			data-slot="badge"
			className={cn(badgeVariants({ variant }), className)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
