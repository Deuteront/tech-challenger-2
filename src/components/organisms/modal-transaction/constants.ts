import React from 'react';
import { Transaction } from '@/service/interfaces';

export const initialTransactionData: Transaction = {
  accountId: '',
  type: 'Debit',
  value: 0,
  date: '',
};

export const MOVEMENT_TYPE = {
  credit: 'Credit',
  debit: 'Debit',
};

export const MOVEMENT_OPTIONS = [
  { value: MOVEMENT_TYPE.credit, text: 'Entrada', arithmeticOperator: '+' },
  { value: MOVEMENT_TYPE.debit, text: 'Saída', arithmeticOperator: '-' },
];
export const MOVEMENT_OPTIONS_FILTER = [
  ...MOVEMENT_OPTIONS,
  { value: '', text: '', arithmeticOperator: '' },
];

const arithmeticOperatorMap = new Map(
  MOVEMENT_OPTIONS.map(({ value, arithmeticOperator }) => [
    value,
    arithmeticOperator,
  ])
);

export const getArithmeticOperator = (value: string): string => {
  return arithmeticOperatorMap.get(value) || 'Operador desconhecido';
};
