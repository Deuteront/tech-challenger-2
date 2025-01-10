import React, { createContext, useContext, useEffect, useState } from 'react';
import { getFromStorage } from '@/utils/storage';
import { TransactionService } from '@/service/transaction';
import { UserService } from '@/service/user';
import {
  Account,
  Filter,
  Transaction,
  UserBalance,
} from '@/service/interfaces';

export interface TransactionContextType {
  transactions: UserBalance['transactions'];
  addTransaction: (newTransaction: Transaction) => Promise<boolean>;
  removeTransaction: (id: Transaction['id']) => void;
  editTransaction: (updatedTransaction: Transaction) => Promise<boolean>;
  cards: UserBalance['cards'];
  accounts: UserBalance['account'];
  updateAccountBalance: (filter?: Filter) => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userBalance, setUserBalance] = useState<UserBalance>();
  const token = getFromStorage('authToken') as string;

  const updateAccountBalance = async (filter?: Filter) => {
    try {
      const { result: userBalance } = await UserService.getAccount(
        token,
        filter
      );

      if (!userBalance || !userBalance.account || !userBalance.transactions) {
        console.error('Dados de conta ou transações ausentes');
        return;
      }

      const objAccount = userBalance.account.reduce(
        (acc, account) => {
          acc[account.id] = account;
          return acc;
        },
        {} as Record<string, Account>
      );
      userBalance.transactions.forEach((transaction) => {
        if (objAccount[transaction.accountId]) {
          transaction.account = objAccount[transaction.accountId];
        } else {
          console.warn(
            `Conta não encontrada para a transação com ID: ${transaction.id}`
          );
        }
      });
      setUserBalance(userBalance);
    } catch (error) {
      console.error('Erro ao atualizar o saldo da conta:', error);
    }
  };

  useEffect(() => {
    updateAccountBalance();
  }, []);

  const addTransaction = async (newTransaction: Transaction) => {
    debugger;
    await TransactionService.createTransaction(token, newTransaction);
    await updateAccountBalance();
    return true;
  };

  const removeTransaction = async (id: Transaction['id']) => {
    await TransactionService.deleteTransaction(token, id as string);
    await updateAccountBalance();
  };

  const editTransaction = async (updatedTransaction: Transaction) => {
    await TransactionService.editTransaction(
      token,
      updatedTransaction.id as string,
      updatedTransaction
    );
    await updateAccountBalance();
    return true;
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions: userBalance?.transactions || [],
        cards: userBalance?.cards || [],
        accounts: userBalance?.account || [],
        addTransaction,
        removeTransaction,
        editTransaction,
        updateAccountBalance,
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
