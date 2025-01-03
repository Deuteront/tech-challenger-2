'use client';

import React from 'react';
import { Body } from '@/components/organisms/home/body/body';
import { TransactionProvider } from '@/components/organisms/providers/transaction-context';
import { Header } from '@/components/organisms/home/header/header';
import { useAuth } from '@/app/auth-context';
import { useRouter } from 'next/navigation';

const Dashboard: React.FC = () => {
  const { isAuth, loginOut } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuth) {
      router.push('/login');
    }
  }, [isAuth]);

  return (
    <>
      <Header isAuth={isAuth} loginOut={loginOut} />
      <TransactionProvider>
        <Body />
      </TransactionProvider>
    </>
  );
};

export default Dashboard;
