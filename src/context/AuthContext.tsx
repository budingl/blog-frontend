import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  register: (username: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 检查用户是否已登录
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUser(res.data);
        } catch (err) {
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, [token]);

  // 注册
  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/register`, {
        username, email, password
      });
      const newToken = res.data.token;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      // 获取用户信息
      const userRes = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${newToken}`
        }
      });
      setUser(userRes.data);
    } catch (err: any) {
      setError(err.response?.data?.message || '注册失败');
    } finally {
      setIsLoading(false);
    }
  };

  // 登录
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/login`, {
        email, password
      });
      const newToken = res.data.token;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      // 获取用户信息
      const userRes = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${newToken}`
        }
      });
      setUser(userRes.data);
    } catch (err: any) {
      setError(err.response?.data?.message || '登录失败');
    } finally {
      setIsLoading(false);
    }
  };

  // 注销
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};