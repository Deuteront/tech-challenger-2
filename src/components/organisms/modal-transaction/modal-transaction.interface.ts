import { Dayjs } from 'dayjs';
import { Props } from '@/components/organisms/dashboard/body/transitions/transactions-list.interface';

export interface Transaction {
  id?: number;
  value: number;
  movement: string;
  paymentMethod: string;
  establishmentType: string;
  desc: string;
  transactionDate: Dayjs | null;
}

export interface TransactionModal extends Omit<Props, 'transactionsList'> {
  transaction: Transaction;
}

export interface Errors {
  value?: string;
  movement?: string;
  paymentMethod?: string;
  establishmentType?: string;
  desc?: string;
  transactionDate?: string;
}
