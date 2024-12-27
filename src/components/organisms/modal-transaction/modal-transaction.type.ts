import { Dayjs } from 'dayjs';
import { transactionsDetails } from '@/components/organisms/dashboard/body/transitions/transactions-list.type';

export type transaction = {
  id?: number;
  value: number;
  movement: string;
  paymentMethod: string;
  establishmentType: string;
  desc: string;
  transactionDate: Dayjs | null;
};

export type transactionModal = {
  transaction: transaction;
} & Omit<transactionsDetails, 'transactionsList'>;

export type errors = {
  value?: string;
  movement?: string;
  paymentMethod?: string;
  establishmentType?: string;
  desc?: string;
  transactionDate?: string;
};
