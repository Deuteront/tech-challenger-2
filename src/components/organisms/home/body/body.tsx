'use client';

import React, { useState } from 'react';
import './style.scss';
import { WelcomeMessage } from '@/components/organisms/home/welcome-message/welcome-message';
import { FinancialDashboardList } from '@/components/molecules/financial-dashboard/financial-deshboard-list';
import { CardBalanceActual } from '@/components/molecules/card-balance-actual/card-balance-actual';
import { Transitions } from '@/components/organisms/transitions/transitions';
import { useTransactionContext } from '@/components/organisms/providers/transaction-context';

export function Body() {
  const { transactions } = useTransactionContext();
  const financialHistoryLastMouth = 'Relação desde o inicio';
  const [visibleValues, setVisibleValues] = useState<boolean>(true);

  const { totalIncoming, totalOutgoing } = transactions?.reduce(
    (acc, transaction) => {
      if (transaction.movement === 'incoming') {
        acc.totalIncoming += transaction.value;
      } else if (transaction.movement === 'outgoing') {
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
              </div>
              <div className="separation"></div>
              <Transitions />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
