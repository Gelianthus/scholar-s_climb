import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { db, delay } from "@/lib/server/db";
import { hashPassword, publicUser, startSession } from "@/lib/server/auth";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  await delay();
  const body = await req.json().catch(() => null);
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim().toLowerCase();
  const password = String(body?.password ?? "");

  if (!name || name.length > 60) return NextResponse.json({ error: "Enter your name (up to 60 characters)." }, { status: 400 });
  if (!EMAIL.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  if (password.length < 8) return NextResponse.json({ error: "Use a password with at least 8 characters." }, { status: 400 });
  if (db.users.has(email)) return NextResponse.json({ error: "An account with this email already exists. Log in instead." }, { status: 409 });

  const user = { id: randomUUID(), name, email, passwordHash: hashPassword(password), createdAt: Date.now() };
  db.users.set(email, user);
  await startSession(user.id);
  return NextResponse.json({ user: publicUser(user) }, { status: 201 });
}
