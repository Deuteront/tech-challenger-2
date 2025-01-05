import {} from '@/components/organisms/modal-transaction/modal-transaction.interface';
import React from 'react';
import { Transaction } from '@/service/interfaces';

export const initialTransactionData: Transaction = {
  accountId: '',
  type: 'Debit',
  value: 0,
  date: '',
};

export const handleNext = async (
  step: number,
  setStep: React.Dispatch<React.SetStateAction<number>>,
  transactionData: Transaction,
  closeModal: (transaction: Transaction) => Promise<void>
): Promise<void> => {
  if (step < 2) {
    setStep(step + 1);
  } else {
    await closeModal(transactionData);
  }
};

export const handlePrev = (
  step: number,
  setStep: React.Dispatch<React.SetStateAction<number>>
): void => {
  if (step > 0) {
    setStep(step - 1);
  }
};

export const MOVEMENT_TYPE = {
  credit: 'Credit',
  debit: 'Debit',
};

export const MOVEMENT_OPTIONS = [
  { value: MOVEMENT_TYPE.credit, text: 'Entrada', arithmeticOperator: '+' },
  { value: MOVEMENT_TYPE.debit, text: 'Saída', arithmeticOperator: '-' },
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
