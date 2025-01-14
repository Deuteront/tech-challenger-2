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
  { value: '', text: '', arithmeticOperator: '-' },
];
export const getMovementOptionByType = (type: 'Credit' | 'Debit' | '') => {
  return MOVEMENT_OPTIONS.find((option) => option.value === type)?.text;
};
const arithmeticOperatorMap = new Map(
  MOVEMENT_OPTIONS.map(({ value, arithmeticOperator }) => [
    value,
    arithmeticOperator,
  ])
);

export const getArithmeticOperator = (value: string): string => {
  return arithmeticOperatorMap.get(value) || 'Operador desconhecido';
};
