import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { db, delay } from "@/lib/server/db";

const RESET_TTL_MS = 15 * 60 * 1000;

export async function POST(req: Request) {
	await delay();
	const body = await req.json().catch(() => null);
	const email = String(body?.email ?? "")
		.trim()
		.toLowerCase();

	const user = db.users.get(email);
	let devResetLink: string | undefined;
	if (user) {
		const token = randomBytes(32).toString("hex");
		db.resets.set(token, {
			userId: user.id,
			expires: Date.now() + RESET_TTL_MS,
		});
		const link = `/reset-password?token=${token}`;
		console.log(`[dev] Password reset link for ${email}: ${link}`);
		if (process.env.NODE_ENV !== "production") devResetLink = link;
	}
	return NextResponse.json({ ok: true, devResetLink });
}
