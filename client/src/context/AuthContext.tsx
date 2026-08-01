import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { authApi, setAuthToken } from '../services/api';
import type { User } from '../types';

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  updateProfile: (name?: string, password?: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('resume_token'));

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    authApi
      .getProfile()
      .then((response) => setUser(response.data.user))
      .catch(() => {
        localStorage.removeItem('resume_token');
        setToken(null);
      });
  }, [token]);

  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password });
    const authToken = response.data.token;
    localStorage.setItem('resume_token', authToken);
    setToken(authToken);
    setUser(response.data.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await authApi.register({ name, email, password });
    const authToken = response.data.token;
    localStorage.setItem('resume_token', authToken);
    setToken(authToken);
    setUser(response.data.user);
  };

  const logout = () => {
    localStorage.removeItem('resume_token');
    setToken(null);
    setUser(null);
  };

  const refreshProfile = async () => {
    const response = await authApi.getProfile();
    setUser(response.data.user);
  };

  const updateProfile = async (name?: string, password?: string) => {
    const response = await authApi.updateProfile({ name, password });
    setUser(response.data.user);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      login,
      register,
      logout,
      refreshProfile,
      updateProfile,
    }),
    [user, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};
