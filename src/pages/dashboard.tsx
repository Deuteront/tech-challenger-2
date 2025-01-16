'use client';

import React from 'react';
import { TransactionPage } from '@/components/organisms/transaction/transaction-page';
import DashboardLayout from '@/components/layouts/dashboard-layout';

const DashboardPage: React.FC = () => {
  return <DashboardLayout><TransactionPage/></DashboardLayout>;
};

export default DashboardPage;
