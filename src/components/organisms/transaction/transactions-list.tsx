import React from 'react';
import { Props } from './transactions-list.interface';
import { TransactionsDetails } from './transactions-details';

export function TransactionsDetailsList({
  transactionsList,
  edit,
  exclude,
}: Props) {
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
