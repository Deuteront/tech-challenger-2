import React, { useMemo } from 'react';
import { Transaction } from '@/service/interfaces';
import { ComponentChart } from '@/components/molecules/chart/chart';
import { MOVEMENT_TYPE } from '@/components/organisms/modal-transaction/constants';
import { format } from 'date-fns';
import { ChartConfiguration } from 'chart.js/auto';

export function HomeChartBar({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const getLastSixMonthsData = () => {
    const months = [];
    const incomeData = [];
    const outgoingData = [];

    const currentDate = new Date();

    for (let i = 5; i >= 0; i--) {
      const monthDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1
      );
      const monthLabel = format(monthDate, 'MMMM yyyy');
      months.push(monthLabel);

      const monthTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return (
          transactionDate.getMonth() === monthDate.getMonth() &&
          transactionDate.getFullYear() === monthDate.getFullYear()
        );
      });

      const monthIncome = monthTransactions
        .filter((transaction) => transaction.type === MOVEMENT_TYPE.credit)
        .reduce((sum, transaction) => sum + transaction.value, 0);
      const monthOutgoing = monthTransactions
        .filter((transaction) => transaction.type === MOVEMENT_TYPE.debit)
        .reduce((sum, transaction) => sum + transaction.value, 0);

      incomeData.push(monthIncome);
      outgoingData.push(monthOutgoing);
    }

    return { months, incomeData, outgoingData };
  };

  const { months, incomeData, outgoingData } = useMemo(
    () => getLastSixMonthsData(),
    [transactions]
  );

  const chartConfig = {
    type: 'line',
    title: 'Gráfico Últimos 6 meses',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Entradas',
          data: incomeData,
          borderColor: 'rgb(207,227,209)',
          backgroundColor: 'rgba(207,227,209,0.7)',
          fill: true,
        },
        {
          label: 'Saídas',
          data: outgoingData,
          borderColor: 'rgb(253,206,203)',
          backgroundColor: 'rgba(253,206,203,0.7)',
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          type: 'logarithmic',
        },
      },
    },
  };

  return (
    <div className={'container-graph'}>
      <span className={'title-graph'}>Gráfico Últimos 6 meses</span>
      <div className={'graph'}>
        <ComponentChart config={chartConfig as ChartConfiguration} />
      </div>
    </div>
  );
}
