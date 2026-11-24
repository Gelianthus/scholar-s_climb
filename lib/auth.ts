"use client";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

export type User = { name: string; email: string };
type AuthState = {
	user: User | null;
	ready: boolean;
	setUser: (u: User | null) => void;
};

export const AuthContext = createContext<AuthState>({
	user: null,
	ready: false,
	setUser: () => {},
});

async function post(url: string, body?: unknown) {
	try {
		const res = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: body ? JSON.stringify(body) : undefined,
		});
		const data = await res.json().catch(() => ({}));
		return { ok: res.ok, data };
	} catch {
		return {
			ok: false,
			data: { error: "Could not reach the server. Try again." },
		};
	}
}

export function useAuth() {
	const { user, ready, setUser } = useContext(AuthContext);

	/** Each returns an error message, or null on success. */
	const signUp = async (name: string, email: string, password: string) => {
		const { ok, data } = await post("/api/auth/signup", {
			name,
			email,
			password,
		});
		if (!ok) return (data.error as string) ?? "Something went wrong.";
		setUser(data.user);
		return null;
	};
	const logIn = async (email: string, password: string) => {
		const { ok, data } = await post("/api/auth/login", { email, password });
		if (!ok) return (data.error as string) ?? "Something went wrong.";
		setUser(data.user);
		return null;
	};
	const logOut = async () => {
		await post("/api/auth/logout");
		setUser(null);
	};

	return { user, ready, signUp, logIn, logOut };
}

export function useProgress() {
	const { user } = useContext(AuthContext);
	const key = `sc-progress:${user?.email ?? "guest"}`;
	const [climbed, setClimbed] = useState<string[]>([]);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		try {
			const raw = localStorage.getItem(key);
			setClimbed(raw ? JSON.parse(raw) : []);
		} catch {
			setClimbed([]);
		}
		setReady(true);
	}, [key]);

	const climb = useCallback(
		(slug: string) => {
			setClimbed((prev) => {
				if (prev.includes(slug)) return prev;
				const next = [...prev, slug];
				try {
					localStorage.setItem(key, JSON.stringify(next));
				} catch {}
				return next;
			});
		},
		[key],
	);

	return { climbed, climb, ready };
}
