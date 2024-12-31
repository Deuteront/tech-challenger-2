interface User {
  id?: string;
  username: string;
  email: string;
  password: string;
}

interface authUser {
  email: string;
  password: string;
}

interface AuthResponse {
  message: string;
  result: {
    token: string;
  };
}

interface Account {
  id: string;
  interface: string;
  userId: string;
}

interface Transaction {
  id: string;
  accountId: string;
  type: string;
  value: number;
  date: string;
  from?: string;
  to?: string;
  anexo?: string;
}

interface TransactionSend {
  accountId: string;
  type: string;
  value: number;
  from?: string;
  to?: string;
  anexo?: string;
}

interface Card {
  id: string;
  accountId: string;
  type: string;
  is_blocked: boolean;
  number: string;
  dueDate: string;
  functions: string;
  cvc: string;
  paymentDate: string | null;
  name: string;
}

interface AccountResponse {
  message: string;
  result: {
    account: Account[];
    transactions: Transaction[];
    cards: Card[];
  };
}

export type {
  User,
  authUser,
  AuthResponse,
  Account,
  Transaction,
  TransactionSend,
  Card,
  AccountResponse,
};
