import { Transaction } from '@/components/organisms/modal-transaction/modal-transaction.interface';

export interface Props {
  transactionsList: Transaction[];
  edit: (id: Transaction['id']) => void;
  exclude: (id: Transaction['id']) => void;
}
