'use client';

import React from 'react';
import { Header } from '@/components/organisms/landing-page/header/header';
import { Body } from '@/components/organisms/home/body/body';
import { TransactionProvider } from '@/components/organisms/providers/transaction-context';

const Dashboard: React.FC = () => {
  return (
    <>
      <Header />
      <TransactionProvider>
        <Body />
      </TransactionProvider>
    </>
  );
};

export default Dashboard;
