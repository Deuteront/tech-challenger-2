import React, { createContext, useContext, useEffect, useState } from 'react';
import { TransactionService } from '@/service/transaction';
import { UserService } from '@/service/user';
import { Account, Transaction, UserBalance } from '@/service/interfaces';

export interface TransactionContextType {
  transactions: UserBalance['transactions'];
  addTransaction: (newTransaction: Transaction) => Promise<boolean>;
  removeTransaction: (id: Transaction['id']) => void;
  editTransaction: (updatedTransaction: Transaction) => Promise<boolean>;
  cards: UserBalance['cards'];
  accounts: UserBalance['account'];
  updateAccountBalance: () => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userBalance, setUserBalance] = useState<UserBalance>();

  const updateAccountBalance = async () => {
    try {
      const { result: userBalance } = await UserService.getAccount();

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
    const formData = new FormData();
    newTransaction.accountId = userBalance?.account[0].id as string;
    Object.entries(newTransaction).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value instanceof File ? value : String(value));
      }
    });
    await TransactionService.createTransaction(formData);
    await updateAccountBalance();
    return true;
  };

  const removeTransaction = async (id: Transaction['id']) => {
    await TransactionService.deleteTransaction(id as string);
    await updateAccountBalance();
  };

  const editTransaction = async (updatedTransaction: Transaction) => {
    const formData = new FormData();
    Object.entries(updatedTransaction).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value instanceof File ? value : String(value));
      }
    });

    await TransactionService.editTransaction(
      updatedTransaction.id as string,
      formData
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
