import Image from "next/image";
import logo from "@/public/logo.png";

export function Logo({
	size = 40,
	className,
}: {
	size?: number;
	className?: string;
}) {
	return (
		<Image
			src={logo}
			alt=""
			width={size}
			className={className}
			style={{ imageRendering: "auto" }}
			priority
		/>
	);
}
