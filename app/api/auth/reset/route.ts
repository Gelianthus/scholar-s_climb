import { NextResponse } from "next/server";
import { db, delay } from "@/lib/server/db";
import { hashPassword } from "@/lib/server/auth";

export async function POST(req: Request) {
	await delay();
	const body = await req.json().catch(() => null);
	const token = String(body?.token ?? "");
	const password = String(body?.password ?? "");

	if (password.length < 8)
		return NextResponse.json(
			{ error: "Use a password with at least 8 characters." },
			{ status: 400 },
		);

	const reset = db.resets.get(token);
	if (!reset || reset.expires < Date.now()) {
		db.resets.delete(token);
		return NextResponse.json(
			{
				error: "This reset link is invalid or has expired. Request a new one.",
			},
			{ status: 400 },
		);
	}

	let user;
	for (const u of db.users.values()) if (u.id === reset.userId) user = u;
	if (!user)
		return NextResponse.json(
			{
				error: "This reset link is invalid or has expired. Request a new one.",
			},
			{ status: 400 },
		);

	user.passwordHash = hashPassword(password);
	db.resets.delete(token);
	for (const [t, s] of db.sessions)
		if (s.userId === user.id) db.sessions.delete(t);
	return NextResponse.json({ ok: true });
}
