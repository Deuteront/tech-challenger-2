'use client';

import React from 'react';
import { TransactionProvider } from '@/components/organisms/providers/transaction-context';
import { Header } from '@/components/organisms/home/header/header';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { Body } from '@/components/organisms/home/body/body';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { isAuth, loginOut } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuth) {
      router.push('/login');
    }
  }, [isAuth]);

  return (
    <TransactionProvider>
      <Header isAuth={isAuth} loginOut={loginOut} />
      <Body>{children}</Body>
    </TransactionProvider>
  );
};

export default DashboardLayout;
