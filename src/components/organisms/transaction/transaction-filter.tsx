import React, { useState } from 'react';
import { useTransactionContext } from '@/components/organisms/providers/transaction-context';
import { Filter, Transaction } from '@/service/interfaces';
import { CustomDateRangePicker } from '@/components/atoms/date-range-picker/date-range-picker';
import { InputCurrency } from '@/components/molecules/input-currency/input-currency';
import { CustomSelect } from '@/components/atoms/select/select';
import { MOVEMENT_OPTIONS_FILTER } from '@/components/organisms/modal-transaction/constants';
import { Input } from '@/components/atoms/input/input';
import { Dayjs } from 'dayjs';
import { DialogTitle } from '@mui/material';

const initialFilter: Filter = {
  date: [null, null],
  value: 0,
  type: '',
  accountId: '',
  from: '',
  to: '',
  anexo: undefined,
};

export function TransactionFilter() {
  const { accounts } = useTransactionContext();
  const [filter, setFilter] = useState<Filter>(initialFilter);

  const handleDateChange = ({
    start,
    end,
  }: {
    start: Dayjs | null;
    end: Dayjs | null;
  }) => {
    setFilter((prev) => ({
      ...prev,
      date: [start, end],
    }));
  };

  const handleValueChange = (newValue: number) => {
    setFilter((prev) => ({
      ...prev,
      value: newValue,
    }));
  };

  const handleTypeChange = (newType: string) => {
    setFilter((prev) => ({
      ...prev,
      type: newType as Transaction['type'],
    }));
  };

  const handleAccountChange = (newAccountId: string) => {
    setFilter((prev) => ({
      ...prev,
      accountId: newAccountId,
    }));
  };

  const handleInputChange = (field: 'from' | 'to', value: string) => {
    setFilter((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAnexoChange = (anexo: string) => {
    let isAnexo = undefined;
    if (anexo !== undefined) {
      isAnexo = anexo === 'true';
    }
    setFilter((prev) => ({
      ...prev,
      anexo: isAnexo,
    }));
  };

  return (
    <>
      <DialogTitle>Filtro</DialogTitle>
      <div className="transactions-filter">
        <CustomDateRangePicker
          labelStart="Data Inicial"
          labelEnd="Data Final"
          value={{ start: filter.date[0], end: filter.date[1] }}
          onChange={handleDateChange}
        />
        <InputCurrency
          value={filter.value}
          label="Valor"
          onChange={handleValueChange}
        />
        <CustomSelect
          value={filter.type}
          label="Movimentação"
          onChange={(e) => handleTypeChange(e.target.value)}
          options={MOVEMENT_OPTIONS_FILTER}
        />
        <CustomSelect
          value={filter.accountId}
          label="Conta"
          onChange={(e) => handleAccountChange(e.target.value)}
          options={accounts.map((account) => ({
            value: account.id,
            text: account.type,
          }))}
        />
        <Input
          type="text"
          label="Origem"
          value={filter.from || ''}
          onChange={(e) => handleInputChange('from', e.target.value)}
        />
        <Input
          type="text"
          label="Destino"
          value={filter.to || ''}
          onChange={(e) => handleInputChange('to', e.target.value)}
        />
        <CustomSelect
          value={filter.anexo === undefined ? '' : filter.anexo.toString()}
          label="Anexo"
          onChange={(e) => handleAnexoChange(e.target.value)}
          options={[
            {
              value: 'true',
              text: 'Com anexo',
            },
            {
              value: 'false',
              text: 'Sem anexo',
            },
          ]}
        />
      </div>
    </>
  );
}
