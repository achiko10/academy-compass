/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { loginUser, registerUser, fetchUserProfile, AuthUser, tokenStorage } from '@/lib/api';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount, check if token exists in sessionStorage and load profile
  useEffect(() => {
    const token = tokenStorage.getAccess();
    if (token) {
      fetchUserProfile(token)
        .then(setUser)
        .catch(() => {
          // Token expired or invalid - clean up both tokens
          tokenStorage.clear();
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (username: string, password: string) => {
    const tokens = await loginUser(username, password);
    tokenStorage.setAccess(tokens.access);
    tokenStorage.setRefresh(tokens.refresh);
    const profile = await fetchUserProfile(tokens.access);
    setUser(profile);
  };

  const register = async (username: string, email: string, password: string) => {
    await registerUser(username, email, password);
    // Auto-login after registration
    await login(username, password);
  };

  const logout = () => {
    tokenStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}
