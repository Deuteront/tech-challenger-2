import React, { createContext, useContext, useState } from 'react';
import { Transaction } from '@/components/organisms/modal-transaction/modal-transaction.interface';
import {
  generateTransactionId,
  transactionsName,
} from '@/components/organisms/modal-transaction/constants';

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (newTransaction: Transaction) => boolean;
  removeTransaction: (id: Transaction['id']) => void;
  editTransaction: (updatedTransaction: Transaction) => boolean;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const storedTransactions = localStorage.getItem(transactionsName);
    return storedTransactions ? JSON.parse(storedTransactions) : [];
  });

  const addTransaction = (newTransaction: Transaction) => {
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

  const removeTransaction = (id: Transaction['id']) => {
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

  const editTransaction = (updatedTransaction: Transaction) => {
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
