import { NextResponse } from "next/server";
import { db, delay } from "@/lib/server/db";
import { DUMMY_HASH, publicUser, startSession, verifyPassword } from "@/lib/server/auth";

export async function POST(req: Request) {
  await delay();
  const body = await req.json().catch(() => null);
  const email = String(body?.email ?? "").trim().toLowerCase();
  const password = String(body?.password ?? "");

  const user = db.users.get(email);
  const valid = verifyPassword(password, user?.passwordHash ?? DUMMY_HASH);
  if (!user || !valid) return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });

  await startSession(user.id);
  return NextResponse.json({ user: publicUser(user) });
}
