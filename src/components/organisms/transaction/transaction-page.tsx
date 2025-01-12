'use client';

import React, { useState } from 'react';
import './style.scss';
import { Button } from '@/components/atoms/button/button';
import ModalWrapper from '@/components/atoms/modal-wrapper/modal-wrapper';
import ModalTransaction from '@/components/organisms/modal-transaction/modal-transaction';
import { TransactionsDetailsList } from './transactions-list';
import { useTransactionContext } from '@/components/organisms/providers/transaction-context';
import { Filter, Transaction } from '@/service/interfaces';
import { TransactionFilter } from '@/components/organisms/transaction/transaction-filter';
import { TransactionService } from '@/service/transaction';

export function TransactionPage() {
  const { transactions, removeTransaction, accounts } = useTransactionContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredTransactions, setFilteredTransactions] =
    useState<Transaction[]>();
  const [transactionId, setTransactionId] =
    useState<Transaction['id']>(undefined);

  const filterTransactions = async (filter: Filter) => {
    try {
      const response = await TransactionService.getStatement(
        accounts[0].id,
        filter
      );
      setFilteredTransactions(response.result.transactions);
    } catch (error) {
      console.log('Erro ao filtrar transações:', error);
    }
  };

  const openModal = (id?: Transaction['id']) => {
    setTransactionId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const exclude = (id: Transaction['id']) => {
    removeTransaction(id);
  };

  const getTransaction = () => {
    return filteredTransactions || transactions || [];
  };

  return (
    <>
      <div className="transactions">
        <div className="row">
          <TransactionFilter filterTransactions={filterTransactions} />
          <div className="d-flex flex-row justify-content-between">
            <span className="transactions-title">Transações recentes</span>
            <Button
              onClick={() => openModal()}
              icon="plus.svg"
              className={['button', 'primary-button', 'add-button-transitions']}
            ></Button>
          </div>
        </div>
        {getTransaction().length > 0 ? (
          <TransactionsDetailsList
            transactionsList={getTransaction()}
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
