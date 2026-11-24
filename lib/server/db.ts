export type UserRecord = {
	id: string;
	name: string;
	email: string;
	passwordHash: string;
	createdAt: number;
};
type Db = {
	users: Map<string, UserRecord>;
	sessions: Map<string, { userId: string; expires: number }>;
};

const g = globalThis as unknown as { __scDb?: Db };
export const db: Db = (g.__scDb ??= { users: new Map(), sessions: new Map() });

export const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));
