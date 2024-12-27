'use client';

import React, { useEffect, useState } from 'react';
import './style.scss';
import { Button } from '@/components/atoms/button/button';
import ModalWrapper from '@/components/atoms/modal-wrapper/modal-wrapper';
import ModalTransaction from '@/components/organisms/modal-transaction/modal-transaction';
import { TransactionsDetailsList } from './transactions-list';
import { transaction } from '@/components/organisms/modal-transaction/modal-transaction.type';
import { useTransactionContext } from '@/components/organisms/providers/transaction-context';

export function Transitions() {
  const { transactions, removeTransaction } = useTransactionContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionId, setTransactionId] =
    useState<transaction['id']>(undefined);

  const openModal = (id?: transaction['id']) => {
    setTransactionId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const exclude = (id: transaction['id']) => {
    removeTransaction(id);
  };

  return (
    <>
      <div className="transactions">
        <div className="row">
          <div className="d-flex flex-row justify-content-between">
            <span className="transactions-title">Transações recentes</span>
            <Button
              onClick={() => openModal()}
              icon="plus.svg"
              className={['button', 'primary-button', 'add-button-transitions']}
            ></Button>
          </div>
        </div>
        {transactions && transactions.length > 0 ? (
          <TransactionsDetailsList
            transactionsList={transactions}
            edit={openModal}
            exclude={exclude}
          />
        ) : (
          <div className="transactions-none">
            <span>Já realizou alguma transação?</span>
            <span>Nenhuma transação encontrada.</span>
          </div>
        )}
      </div>
      <ModalWrapper isOpen={isModalOpen} title="">
        <ModalTransaction
          closeModal={closeModal}
          transactionId={transactionId}
        />
      </ModalWrapper>
    </>
  );
}
