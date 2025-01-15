import { Filter, Transaction } from '@/service/interfaces';
import { service } from '@/service/facade';
import { getFromStorage } from '@/utils/storage';

const token = getFromStorage('authToken') as string;

const createTransaction = async (
  transaction: FormData
): Promise<Transaction> => {
  return service.post<Transaction, FormData>(
    '/account/transaction',
    transaction,
    token
  );
};

const getStatement = async (
  accountId: string,
  filter?: Filter
): Promise<{
  message: string;
  result: { transactions: Transaction[]; lastPage: { nextPage?: true } };
}> => {
  return service.get<
    {
      message: string;
      result: { transactions: Transaction[]; lastPage: { nextPage?: true } };
    },
    Filter
  >(`/account/${accountId}/statement`, token, filter);
};

const editTransaction = async (
  transactionId: string,
  transaction: FormData
): Promise<{
  message: string;
  result: Transaction;
}> => {
  return service.put<
    {
      message: string;
      result: Transaction;
    },
    FormData
  >(`/account/transaction/${transactionId}`, transaction, token);
};

const deleteTransaction = async (
  transactionId: string
): Promise<{
  message: string;
}> => {
  return service.delete<{
    message: string;
  }>(`/account/transaction/${transactionId}`, token);
};

const downloadAnexo = async (anexo: string) => {
  return service.download(`/account/transaction/${anexo}`, token);
};

export const TransactionService = {
  createTransaction,
  getStatement,
  editTransaction,
  deleteTransaction,
  downloadAnexo,
};
