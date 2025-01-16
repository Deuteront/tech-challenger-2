'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/atoms/button/button';
import ModalWrapper from '@/components/atoms/modal-wrapper/modal-wrapper';
import ModalTransaction from '@/components/organisms/modal-transaction/modal-transaction';
import { TransactionsDetailsList } from './transactions-list';
import { useTransactionContext } from '@/components/organisms/providers/transaction-context';
import { Filter, Transaction } from '@/service/interfaces';
import { TransactionFilter } from '@/components/organisms/transaction/transaction-filter';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { TransactionService } from '@/service/transaction';

const initialFilter: Filter = {
  dateInitial: '',
  dateFinal: '',
  valueFinal: 0,
  valueInitial: 0,
  text: '',
  type: '',
  anexo: undefined,
};

export function TransactionPage() {
  const { removeTransaction, accounts } = useTransactionContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>(initialFilter);

  const [transactionId, setTransactionId] =
    useState<Transaction['id']>(undefined);

  const openModal = (id?: Transaction['id']) => {
    setTransactionId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function fetchTodoList() {
    return TransactionService.getStatement(accounts[0].id, filter);
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['paulo', JSON.stringify(filter)],
    queryFn: fetchTodoList,
  });

  const onChangeFilter = (filter: Filter) => {
    setFilter(filter);
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
        <TransactionFilter filter={filter} onChange={onChangeFilter} />
        {isPending ? (
          <div className="transactions-none">
            <span>Carregando?</span>
          </div>
        ) : isError ? (
          <div className="transactions-none">
            <span>Error: {error.message}</span>
          </div>
        ) : data?.result.transactions.length !== 0 ? (
          <TransactionsDetailsList
            transactionsList={data?.result.transactions}
            edit={openModal}
            exclude={removeTransaction}
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
