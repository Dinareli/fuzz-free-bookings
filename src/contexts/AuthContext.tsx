import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

interface User {
  id: number;
  username: string;
  name: string;
  professionalId: string;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const API_URL = "http://localhost:5179";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("auth_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const res = await fetch(`${API_URL}/users?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
    if (!res.ok) throw new Error("Erro ao autenticar");
    const data: Array<User & { password?: string }> = await res.json();
    const found = data[0];
    if (!found) throw new Error("Credenciais inválidas");
    const { password, ...sanitized } = found;
    setUser(sanitized);
    localStorage.setItem("auth_user", JSON.stringify(sanitized));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("auth_user");
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isAuthenticated: !!user,
    login,
    logout,
  }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}


