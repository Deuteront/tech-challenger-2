import { transaction } from '@/components/organisms/modal-transaction/modal-transaction.type';
import { getFromStorage, saveToStorage } from '@/utils/storage';
import dayjs from 'dayjs';

export const initialTransactionData: transaction = {
  value: 0.0,
  movement: '',
  paymentMethod: '',
  establishmentType: '',
  transactionDate: dayjs(),
  desc: '',
};

export const handleNext = (
  step: number,
  setStep: (step: number) => void,
  transactionData: transaction,
  closeModal: (transaction: transaction) => void
) => {
  if (step < 2) {
    setStep(step + 1);
  } else {
    const newTransaction = {
      ...transactionData,
      id: generateTransactionId(),
    };
    closeModal(newTransaction);
  }
};

export const handlePrev = (step: number, setStep: (step: number) => void) => {
  if (step > 0) {
    setStep(step - 1);
  }
};

export const generateTransactionId = (): number => {
  const currentId = (getFromStorage('transactionIdCounter') as number) || 0;
  const newId = currentId + 1;
  saveToStorage('transactionIdCounter', newId);
  return newId;
};

export const transactionsName = 'transactions';

export const MOVEMENT_OPTIONS = [
  { value: 'incoming', text: 'Entrada', arithmeticOperator: '+' },
  { value: 'outgoing', text: 'Saída', arithmeticOperator: '-' },
];
const arithmeticOperatorMap = new Map(
  MOVEMENT_OPTIONS.map(({ value, arithmeticOperator }) => [
    value,
    arithmeticOperator,
  ])
);

export const getArithmeticOperator = (value: string) =>
  arithmeticOperatorMap.get(value) || 'Operador desconhecido';

export const PAYMENT_METHOD_OPTIONS = [
  { value: 'dinheiro', text: 'Dinheiro' },
  { value: 'cartão', text: 'Cartão' },
  { value: 'pix', text: 'Pix' },
];

const paymentMethodMap = new Map(
  PAYMENT_METHOD_OPTIONS.map(({ value, text }) => [value, text])
);

export const getPaymentMethodText = (value: string) =>
  paymentMethodMap.get(value) || 'Método de pagamento desconhecido';

export const ESTABLISHMENT_TYPE_SAVE = 'guardar';

export const ESTABLISHMENT_TYPE_OPTIONS = [
  { value: 'conta', text: 'Conta', icon: 'grey-boleto' },
  { value: 'alimentação', text: 'Alimentação', icon: 'grey-fork' },
  { value: ESTABLISHMENT_TYPE_SAVE, text: 'Guardar', icon: 'grey-pig' },
];

const iconMap = new Map(
  ESTABLISHMENT_TYPE_OPTIONS.map(({ value, icon }) => [value, icon])
);

export const getIconEstablishment = (iconTransaction: string) =>
  iconMap.get(iconTransaction) || 'grey-boleto';
