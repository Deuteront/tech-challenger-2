import React from 'react';
import './style.scss';
import Image from 'next/image';
import { Button } from '@/components/atoms/button/button';
import Tooltip from '@mui/material/Tooltip';
import dayjs from 'dayjs';
import { TransactionModal } from '@/components/organisms/modal-transaction/modal-transaction.interface';
import { MOVEMENT_TYPE } from '@/components/organisms/modal-transaction/constants';
import { TransactionService } from '@/service/transaction';

export function TransactionsDetails({
  transaction,
  edit,
  exclude,
}: TransactionModal) {
  const { date, id, value, type, to, from, anexo, account } = transaction;

  const downloadAnexo = async () => {
    await TransactionService.downloadAnexo(anexo as string);
  };

  return (
    <div className="transaction">
      <div className="transaction-title">
        <Image
          src={`/svgs/${type === 'Credit' ? 'indicador_card_Icon_up' : 'indicador_card_Icon_low'}.svg`}
          alt={type === MOVEMENT_TYPE.credit ? 'Entrada' : 'Saida'}
          width={40}
          height={40}
        />

        <div className="flex-column">
          {account && (
            <div className="transactions-list-title">Conta: {account.type}</div>
          )}
          {anexo && (
            <button onClick={downloadAnexo} className="transactions-type">
              Anexo: {anexo as string}
            </button>
          )}
        </div>

        {to && <div className="transactions-type">Entrada: {to}</div>}
        {from && <div className="transactions-type">Saída: {from}</div>}
      </div>
      <div className="transaction-desc">
        <div className="transaction-info">
          <div className="transaction-date">
            {dayjs(date).format('dddd, DD/MM/YYYY')}
          </div>
          <Tooltip
            title={value.toString().length > 10 ? `R$ ${value}` : ''}
            arrow
          >
            <div className={'transaction-price ' + type}>{'R$ ' + value}</div>
          </Tooltip>
        </div>
        <div className="transaction-edit">
          <Button
            onClick={() => {
              edit(id);
            }}
            icon={'grey-edit.svg'}
            className={['transaction-button']}
          ></Button>
          <Button
            className={['transaction-button']}
            onClick={() => {
              exclude(id);
            }}
            icon={'grey-delete.svg'}
          ></Button>
        </div>
      </div>
    </div>
  );
}
