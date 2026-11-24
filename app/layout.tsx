import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const press = Press_Start_2P({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-press",
});
const vt = VT323({ weight: "400", subsets: ["latin"], variable: "--font-vt" });

export const metadata: Metadata = {
	title: "Scholar's Climb",
	description:
		"Learn IT skills step by step. Read lessons, pass quizzes, and unlock the next floor.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${press.variable} ${vt.variable}`}
		>
			<body className="flex min-h-screen flex-col">
				<AuthProvider>
					<SiteHeader />
					<div className="flex-1">{children}</div>
					<SiteFooter />
				</AuthProvider>
			</body>
		</html>
	);
}
