import React, { useEffect, useState } from 'react';
import { CustomSelect } from '@/components/atoms/select/select';
import './style.scss';
import { InputCurrency } from '@/components/molecules/input-currency/input-currency';
import { initialTransactionData, MOVEMENT_OPTIONS } from './constants';
import { Errors } from '@/components/organisms/modal-transaction/modal-transaction.interface';
import { useTransactionContext } from '@/components/organisms/providers/transaction-context';
import { Button } from '@/components/atoms/button/button';
import { Input } from '@/components/atoms/input/input';
import { Transaction } from '@/service/interfaces';

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
  const { transactions, editTransaction, addTransaction, accounts } =
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
    if (!transactionData.accountId) {
      newErrors.accountId = 'A Conta é obrigatória.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        <CustomSelect
          value={transactionData.accountId.toString()}
          label="Conta *"
          onChange={(e) =>
            setTransactionData((prev) => ({
              ...prev,
              accountId: e.target.value,
            }))
          }
          options={accounts.map((account) => ({
            value: account.id,
            text: account.type,
          }))}
          error={!!errors.accountId}
          helperText={errors.accountId}
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
        <Input
          type="text"
          label="Anexo"
          onChange={(e) =>
            setTransactionData((prev) => ({
              ...prev,
              anexo: e.target.value,
            }))
          }
          value={transactionData.anexo || ''}
        />
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
