import React, { createContext, useContext, useState } from 'react';
import { transaction } from '@/components/organisms/modal-transaction/modal-transaction.type';
import {
  generateTransactionId,
  transactionsName,
} from '@/components/organisms/modal-transaction/constants';

interface TransactionContextType {
  transactions: transaction[];
  addTransaction: (newTransaction: transaction) => boolean;
  removeTransaction: (id: transaction['id']) => void;
  editTransaction: (updatedTransaction: transaction) => boolean;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<transaction[]>(() => {
    const storedTransactions = localStorage.getItem(transactionsName);
    return storedTransactions ? JSON.parse(storedTransactions) : [];
  });

  const addTransaction = (newTransaction: transaction) => {
    setTransactions((prev) => {
      const updatedTransactions = [
        ...prev,
        {
          ...newTransaction,
          id: generateTransactionId(),
        },
      ];
      localStorage.setItem(
        transactionsName,
        JSON.stringify(updatedTransactions)
      );
      return updatedTransactions;
    });
    return true;
  };

  const removeTransaction = (id: transaction['id']) => {
    setTransactions((prev) => {
      const updatedTransactions = prev.filter(
        (transaction) => transaction.id !== id
      );
      localStorage.setItem(
        transactionsName,
        JSON.stringify(updatedTransactions)
      );
      return updatedTransactions;
    });
  };

  const editTransaction = (updatedTransaction: transaction) => {
    setTransactions((prev) => {
      const updatedTransactions = prev.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      );
      localStorage.setItem(
        transactionsName,
        JSON.stringify(updatedTransactions)
      );
      return updatedTransactions;
    });
    return true;
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        removeTransaction,
        editTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      'Sem contexto de transação. Verifique se o TransactionProvider está acima no componente pai.'
    );
  }
  return context;
};
