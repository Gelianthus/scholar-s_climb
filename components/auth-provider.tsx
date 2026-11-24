"use client";
import { useEffect, useState } from "react";
import { AuthContext, type User } from "@/lib/auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => { if (!cancelled) setUser(d.user ?? null); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setReady(true); });
    return () => { cancelled = true; };
  }, []);

  return <AuthContext.Provider value={{ user, ready, setUser }}>{children}</AuthContext.Provider>;
}
