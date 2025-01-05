import { Transaction, TransactionSend } from '@/service/interfaces';
import { service } from '@/service/facade';

const createTransaction = async (
  token: string,
  transaction: Transaction
): Promise<Transaction> => {
  return service.post<Transaction, TransactionSend>(
    '/account/transaction',
    { ...transaction },
    token
  );
};

const getStatement = async (
  token: string,
  accountId: string
): Promise<{
  message: string;
  result: { transactions: Transaction[] };
}> => {
  return service.get<{
    message: string;
    result: { transactions: Transaction[] };
  }>(`/account/${accountId}/statement`, token);
};

const editTransaction = async (
  token: string,
  transactionId: string,
  updatedTransaction: Partial<Transaction>
): Promise<{
  message: string;
  result: Transaction;
}> => {
  return service.put<
    {
      message: string;
      result: Transaction;
    },
    Partial<Transaction>
  >(`/account/transaction/${transactionId}`, updatedTransaction, token);
};

const deleteTransaction = async (
  token: string,
  transactionId: string
): Promise<{
  message: string;
}> => {
  return service.delete<{
    message: string;
  }>(`/account/transaction/${transactionId}`, token);
};

export const TransactionService = {
  createTransaction,
  getStatement,
  editTransaction,
  deleteTransaction,
};
