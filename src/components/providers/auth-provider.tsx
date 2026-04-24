"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getSession, clearSession } from "@/lib/local-db";

interface AuthUser {
  uid: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage session on mount
    const session = getSession();
    setUser(session);
    setLoading(false);
  }, []);

  const logout = () => {
    clearSession();
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
