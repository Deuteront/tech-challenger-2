import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/atoms/button/button';
import Tooltip from '@mui/material/Tooltip';
import dayjs from 'dayjs';
import { TransactionModal } from '@/components/organisms/modal-transaction/modal-transaction.interface';
import { MOVEMENT_TYPE } from '@/components/organisms/modal-transaction/constants';
import { TransactionService } from '@/service/transaction';
import AttachFileIcon from '@mui/icons-material/AttachFile';

export function TransactionsDetails({
  transaction,
  edit,
  exclude,
}: TransactionModal) {
  const { date, id, value, type, to, from, anexo } = transaction;

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
          <div className="transactions-list-title">
            <div>
              {type === MOVEMENT_TYPE.credit ? 'Entrada' : 'Saida'}{' '}
              {anexo && (
                <AttachFileIcon
                  onClick={downloadAnexo}
                  className="transactions-type anexo"
                />
              )}
            </div>
            {to && <div className="transactions-type">Origem: {to}</div>}
            {from && <div className="transactions-type">Destino: {from}</div>}
          </div>
        </div>
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
