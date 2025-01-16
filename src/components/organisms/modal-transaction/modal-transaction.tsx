import React, { useEffect, useState } from 'react';
import { CustomSelect } from '@/components/atoms/select/select';
import { InputCurrency } from '@/components/molecules/input-currency/input-currency';
import { initialTransactionData, MOVEMENT_OPTIONS } from './constants';
import { Errors } from '@/components/organisms/modal-transaction/modal-transaction.interface';
import { useTransactionContext } from '@/components/organisms/providers/transaction-context';
import { Input } from '@/components/atoms/input/input';
import { Transaction } from '@/service/interfaces';
import { Button } from '@/components/atoms/button/button';
import { UploadFile } from '@/components/atoms/upload-file/upload-file';

interface ModalContentProps {
  closeModal: () => void;
  transactionId?: Transaction['id'];
}

const ModalTransaction: React.FC<ModalContentProps> = ({
  closeModal,
  transactionId,
}) => {
  const [errors, setErrors] = useState<Errors>({});
  const [transactionData, setTransactionData] = useState<Transaction>(
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

  const validateFields = () => {
    const newErrors: Errors = {};
    if (!transactionData.value || transactionData.value === 0) {
      newErrors.value = 'Valor é obrigatório.';
    }
    if (!transactionData.type) {
      newErrors.type = 'Movimentação é obrigatória.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setTransactionData((prev) => ({
      ...prev,
      anexo: file,
    }));
  };

  const handleSaveTransaction = async () => {
    if (validateFields()) {
      const transactionAction = transactionId
        ? editTransaction
        : addTransaction;

      await transactionAction(transactionData);
      closeModal();
    }
  };

  return (
    <div className="modal-transaction">
      <div className="body-modal-transaction">
        <h2>
          {transactionId ? 'Editar transação' : 'Adicionar nova transação'}
        </h2>
        <InputCurrency
          value={transactionData.value}
          label="Valor *"
          error={!!errors.value}
          helperText={errors.value}
          onChange={(value) =>
            setTransactionData((prev) => ({ ...prev, value }))
          }
        />
        <CustomSelect
          value={transactionData.type.toString()}
          label="Movimentação *"
          onChange={(e) =>
            setTransactionData((prev) => ({
              ...prev,
              type: e.target.value as Transaction['type'],
            }))
          }
          options={MOVEMENT_OPTIONS}
          error={!!errors.type}
          helperText={errors.type}
        />
        <Input
          type="text"
          label="Origem"
          onChange={(e) =>
            setTransactionData((prev) => ({
              ...prev,
              from: e.target.value,
            }))
          }
          value={transactionData.from || ''}
        />
        <Input
          type="text"
          label="Destino"
          onChange={(e) =>
            setTransactionData((prev) => ({
              ...prev,
              to: e.target.value,
            }))
          }
          value={transactionData.to || ''}
        />
        <UploadFile onChange={handleFileChange}></UploadFile>
      </div>
      <div className="navigation-buttons">
        <Button
          className={['navigation-button']}
          onClick={handleSaveTransaction}
        >
          {transactionId ? 'Salvar' : 'Adicionar'}
        </Button>
        <Button className={['navigation-button']} onClick={closeModal}>
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default ModalTransaction;
