'use client';

import React, { useState } from 'react';
import { WelcomeMessage } from '@/components/organisms/home/welcome-message/welcome-message';
import { FinancialDashboardList } from '@/components/molecules/financial-dashboard/financial-deshboard-list';
import { CardBalanceActual } from '@/components/molecules/card-balance-actual/card-balance-actual';
import { useTransactionContext } from '@/components/organisms/providers/transaction-context';
import { MOVEMENT_TYPE } from '@/components/organisms/modal-transaction/constants';
import { HomeChartBar } from '@/components/molecules/chart/home-chart-bar';

export function Body({ children }: { children: React.ReactNode }) {
  const { transactions } = useTransactionContext();
  const financialHistoryLastMouth = 'Relação desde o inicio';
  const [visibleValues, setVisibleValues] = useState<boolean>(true);

  const { totalIncoming, totalOutgoing } = transactions?.reduce(
    (acc, transaction) => {
      if (transaction.type === MOVEMENT_TYPE.credit) {
        acc.totalIncoming += transaction.value;
      } else if (transaction.type === MOVEMENT_TYPE.debit) {
        acc.totalOutgoing += transaction.value;
      }
      return acc;
    },
    { totalIncoming: 0, totalOutgoing: 0 }
  );

  const financialDashboards = [
    {
      icon: 'indicador_card_Icon_up',
      textTitle: 'Entradas',
      textValue: totalIncoming?.toFixed(2) || '0',
      financialHistory: financialHistoryLastMouth,
    },
    {
      icon: 'indicador_card_Icon_low',
      textTitle: 'Saídas',
      textValue: totalOutgoing?.toFixed(2) || '0',
      financialHistory: financialHistoryLastMouth,
    },
  ];

  const totalValue =
    'R$ ' + ((totalIncoming || 0) - (totalOutgoing || 0)).toFixed(2);

  const addClassInvisible = () => {
    setVisibleValues(!visibleValues);
  };
  return (
    <>
      <div className={'body ' + (visibleValues ? '' : 'invisible-values')}>
        <div className="container">
          <div className="row">
            <div className="col-12 context-body-home">
              <div className="welcome-container">
                <WelcomeMessage />
                <CardBalanceActual
                  icon={visibleValues ? 'visibility' : 'invisibility'}
                  textValue={totalValue?.toString()}
                  onClick={addClassInvisible}
                />
                <FinancialDashboardList
                  financialDashboard={financialDashboards}
                  className="financial-dashboard-list"
                />
                <div className="financialDashboard chart">
                  {transactions.length > 0 && (
                    <HomeChartBar transactions={transactions}></HomeChartBar>
                  )}
                </div>
              </div>
              <div className="separation"></div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
