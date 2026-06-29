import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiGet, apiPost, invalidateCache } from "../lib/api.js";
import {
  clearAuthStorage,
  getAuthToken,
  getStoredAuthUser,
  storeAuthToken,
  storeAuthUser,
} from "../lib/crmContext.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredAuthUser());
  const [loading, setLoading] = useState(true);

  const bootstrap = useCallback(async () => {
    const token = getAuthToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const data = await apiGet("/api/auth/me", { skipCache: true, cacheTtl: 0, timeoutMs: 12000 });
      if (data?.user) {
        setUser(data.user);
        storeAuthUser(data.user);
      } else {
        clearAuthStorage();
        setUser(null);
      }
    } catch {
      clearAuthStorage();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  const login = useCallback(async (loginId, password) => {
    const data = await apiPost("/api/auth/login", { loginId, password });
    if (!data?.token || !data?.user) {
      throw new Error(data?.message || "Login failed");
    }
    storeAuthToken(data.token);
    storeAuthUser(data.user);
    setUser(data.user);
    setLoading(false);
    invalidateCache();
    return data.user;
  }, []);

  const logout = useCallback(() => {
    clearAuthStorage();
    setUser(null);
    invalidateCache();
  }, []);

  const changePassword = useCallback(async (currentPassword, newPassword) => {
    const data = await apiPost("/api/auth/change-password", { currentPassword, newPassword });
    if (!data?.success) {
      throw new Error(data?.message || "Could not update password");
    }
    if (data?.user) {
      setUser(data.user);
      storeAuthUser(data.user);
    }
    return data;
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, logout, changePassword, refreshUser: bootstrap }),
    [user, loading, login, logout, changePassword, bootstrap],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
