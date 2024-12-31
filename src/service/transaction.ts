import { Transaction, TransactionSend } from '@/service/interfaces';
import { service } from '@/service/facade';

export class TransactionService {
  async createTransaction(
    token: string,
    accountId: string,
    type: string,
    value: number,
    from?: string,
    to?: string,
    anexo?: string
  ): Promise<Transaction> {
    return service.post<Transaction, TransactionSend>(
      '/account/transaction',
      { accountId, type, value, from, to, anexo },
      token
    );
  }

  async getStatement(
    token: string,
    accountId: string
  ): Promise<{
    message: string;
    result: { transactions: Transaction[] };
  }> {
    return service.get<{
      message: string;
      result: { transactions: Transaction[] };
    }>(`/account/${accountId}/statement`, token);
  }
}
