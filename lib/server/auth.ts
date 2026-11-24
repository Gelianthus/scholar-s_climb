import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { db, type UserRecord } from "./db";

const COOKIE = "sc_session";
const TTL_MS = 7 * 24 * 60 * 60 * 1000;

export function hashPassword(password: string) {
	const salt = randomBytes(16).toString("hex");
	return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}

export function verifyPassword(password: string, stored: string) {
	const [salt, hash] = stored.split(":");
	const expected = Buffer.from(hash, "hex");
	const actual = scryptSync(password, salt, 64);
	return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export const DUMMY_HASH = hashPassword("not-a-real-password");

export async function startSession(userId: string) {
	const token = randomBytes(32).toString("hex");
	db.sessions.set(token, { userId, expires: Date.now() + TTL_MS });
	(await cookies()).set(COOKIE, token, {
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		path: "/",
		maxAge: TTL_MS / 1000,
	});
}

export async function endSession() {
	const jar = await cookies();
	const token = jar.get(COOKIE)?.value;
	if (token) db.sessions.delete(token);
	jar.delete(COOKIE);
}

export async function currentUser(): Promise<UserRecord | null> {
	const token = (await cookies()).get(COOKIE)?.value;
	if (!token) return null;
	const session = db.sessions.get(token);
	if (!session) return null;
	if (session.expires < Date.now()) {
		db.sessions.delete(token);
		return null;
	}
	for (const u of db.users.values()) if (u.id === session.userId) return u;
	return null;
}

export const publicUser = (u: UserRecord) => ({ name: u.name, email: u.email });
