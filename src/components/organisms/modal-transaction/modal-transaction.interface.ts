import { Props } from '@/components/organisms/transaction/transactions-list.interface';
import { Transaction } from '@/service/interfaces';

export interface TransactionModal extends Omit<Props, 'transactionsList'> {
  transaction: Transaction;
}

export interface Errors {
  anexo?: string;
  value?: string;
  accountId?: string;
  type?: string;
}
