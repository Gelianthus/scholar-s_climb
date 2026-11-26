import { ResetPasswordForm } from "@/components/recovery-forms";
export const metadata = { title: "Reset password | Scholar's Climb" };

export default async function ResetPasswordPage({
	searchParams,
}: {
	searchParams: Promise<{ token?: string }>;
}) {
	const { token } = await searchParams;
	return <ResetPasswordForm token={token} />;
}
