'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getFromStorage,
  removeFromStorage,
  saveToStorage,
} from '@/utils/storage';
import { UserService } from '@/service/user';
import { jwtDecode } from 'jwt-decode';
import { User } from '@/service/interfaces';

interface AuthContextProps {
  isAuth: boolean;
  token?: string;
  loginOut: () => void;
  login: (email: string, password: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [auth, setAuth] = useState<{ isAuth: boolean; token?: string }>({
    isAuth: false,
    token: undefined,
  });

  useEffect(() => {
    const storedToken = getFromStorage('authToken') as string;
    if (storedToken) {
      setAuth({ isAuth: true, token: storedToken });
    } else {
      setAuth({ isAuth: false, token: undefined });
    }
  }, []);

  const loginOut = () => {
    removeFromStorage('authToken');
    setAuth({ isAuth: false, token: undefined });
    document.cookie = 'authToken=';
    router.push('/login');
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await UserService.authenticateUser(email, password);
      const newToken = response.result.token;

      saveToStorage('authToken', newToken);
      document.cookie = `authToken=${newToken}`;

      const user = jwtDecode(newToken) as User;
      saveToStorage('username', user.username);

      setAuth({ isAuth: true, token: newToken });
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao autenticar. Verifique suas credenciais.');
    }
  };

  return (
    <AuthContext.Provider value={{ ...auth, loginOut, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
