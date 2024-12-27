import { transaction } from '@/components/organisms/modal-transaction/modal-transaction.type';

export type transactionsDetails = {
  transactionsList: transaction[];
  edit: (id: transaction['id']) => void;
  exclude: (id: transaction['id']) => void;
};
