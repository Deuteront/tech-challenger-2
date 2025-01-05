import { Props } from '@/components/organisms/transitions/transactions-list.interface';
import { Transaction } from '@/service/interfaces';

export interface TransactionModal extends Omit<Props, 'transactionsList'> {
  transaction: Transaction;
}

export interface Errors {
  value?: string;
  accountId?: string;
  type?: string;
}
