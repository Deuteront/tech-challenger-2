import { Transaction } from '@/service/interfaces';

export interface Props {
  transactionsList: Transaction[];
  edit: (id: Transaction['id']) => void;
  exclude: (id: Transaction['id']) => void;
}
