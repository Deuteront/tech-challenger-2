import React from 'react';
import { transactionsDetails } from './transactions-list.type';
import { TransactionsDetails } from './transactions';

export function TransactionsDetailsList({
  transactionsList,
  edit,
  exclude,
}: transactionsDetails) {
  return (
    <div className="transactions-list">
      {transactionsList.map((item, index) => (
        <TransactionsDetails
          key={index}
          transaction={item}
          exclude={exclude}
          edit={edit}
        />
      ))}
    </div>
  );
}
