import React, { useEffect, useState } from 'react';
import { CustomSelect } from '@/components/atoms/select/select';
import { CustomDatePicker } from '@/components/atoms/datepicker/datepicker';
import NavigationButtons from '@/components/molecules/navigation-buttons/navigation-buttons';
import './style.scss';
import { InputCurrency } from '@/components/molecules/input-currency/input-currency';
import {
  initialTransactionData,
  handleNext,
  handlePrev,
  MOVEMENT_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
  ESTABLISHMENT_TYPE_OPTIONS,
} from './constants';
import {
  errors,
  transaction,
} from '@/components/organisms/modal-transaction/modal-transaction.type';
import dayjs from 'dayjs';
import { Input } from '@/components/atoms/input/input';
import { useTransactionContext } from '@/components/organisms/providers/transaction-context';

interface ModalContentProps {
  closeModal: () => void;
  transactionId?: transaction['id'];
}

const ModalTransaction: React.FC<ModalContentProps> = ({
  closeModal,
  transactionId,
}) => {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<errors>({});
  const [transactionData, setTransactionData] = useState<transaction>(
    initialTransactionData
  );
  const { transactions, editTransaction, addTransaction } =
    useTransactionContext();

  useEffect(() => {
    const transactionToEdit = transactions.find((t) => t.id === transactionId);
    if (transactionToEdit) {
      setTransactionData(transactionToEdit);
    }
  }, [transactionId, transactions]);

  const validateStep = () => {
    const newErrors: errors = {};

    if (step === 0) {
      if (!transactionData.value || transactionData.value === 0) {
        newErrors.value = 'Valor é obrigatório.';
      }
    }

    if (step === 1) {
      if (!transactionData.movement) {
        newErrors.movement = 'Movimentação é obrigatória.';
      }
      if (!transactionData.paymentMethod) {
        newErrors.paymentMethod = 'Método de pagamento é obrigatório.';
      }
      if (!transactionData.desc) {
        newErrors.desc = 'Descrição é obrigatória.';
      }
      if (!transactionData.establishmentType) {
        newErrors.establishmentType = 'Tipo de estabelecimento é obrigatório.';
      }
      if (!transactionData.transactionDate) {
        newErrors.transactionDate = 'Data da transação é obrigatória.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep()) {
      if (step === 1 && transactionId) {
        editTransaction(transactionData);
      }
      handleNext(step, setStep, transactionData, (transaction) => {
        const funcTransaction = transactionId
          ? editTransaction
          : addTransaction;

        return funcTransaction(transaction) && closeModal();
      });
    }
  };

  return (
    <div className="modal-transaction">
      {step === 0 && (
        <div className="body-modal-transaction">
          {transactionId ? (
            <h2>Editar transação</h2>
          ) : (
            <h2>Qual é o valor da transação?</h2>
          )}
          <InputCurrency
            value={transactionData.value}
            label="Valor"
            error={!!errors.value}
            helperText={errors.value}
            onChange={(value) =>
              setTransactionData({
                ...transactionData,
                value,
              })
            }
          />
        </div>
      )}

      {step === 1 && (
        <div className="body-modal-transaction">
          <h2>Como você gostaria de classificar essa transação?</h2>
          <CustomSelect
            value={transactionData.movement.toString()}
            label="Movimentação"
            onChange={(e) =>
              setTransactionData({
                ...transactionData,
                movement: e.target.value,
              })
            }
            options={MOVEMENT_OPTIONS}
            error={!!errors.movement}
            helperText={errors.movement}
          />

          <CustomSelect
            label="Método de pagamento"
            value={transactionData.paymentMethod.toString()}
            onChange={(e) =>
              setTransactionData({
                ...transactionData,
                paymentMethod: e.target.value,
              })
            }
            options={PAYMENT_METHOD_OPTIONS}
            error={!!errors.paymentMethod}
            helperText={errors.paymentMethod}
          />

          <Input
            label="Descrição"
            value={transactionData.desc.toString()}
            error={!!errors.desc}
            helperText={errors.desc}
            onChange={(e) =>
              setTransactionData({
                ...transactionData,
                desc: e.target.value,
              })
            }
          />

          <CustomSelect
            value={transactionData.establishmentType.toString()}
            label="Tipo de estabelecimento"
            onChange={(e) =>
              setTransactionData({
                ...transactionData,
                establishmentType: e.target.value,
              })
            }
            options={ESTABLISHMENT_TYPE_OPTIONS}
            error={!!errors.establishmentType}
            helperText={errors.establishmentType}
          />
          <CustomDatePicker
            label="Data da transação"
            value={
              transactionData.transactionDate
                ? dayjs(transactionData.transactionDate)
                : dayjs()
            }
            error={!!errors.transactionDate}
            helperText={errors.transactionDate}
            onChange={(e) => {
              setTransactionData({
                ...transactionData,
                transactionDate: e,
              });
            }}
          />
        </div>
      )}

      {step === 2 && (
        <div className="body-modal">
          <h2>Transação adicionada com sucesso!</h2>
        </div>
      )}
      <NavigationButtons
        closeModal={closeModal}
        handleNext={handleNextStep}
        handlePrev={() => handlePrev(step, setStep)}
        isLastStep={step === 2}
        isFirstStep={step === 0}
      />
    </div>
  );
};

export default ModalTransaction;
