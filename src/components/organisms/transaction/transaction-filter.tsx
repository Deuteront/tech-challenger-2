import React from 'react';
import { Filter, Transaction } from '@/service/interfaces';
import { CustomDateRangePicker } from '@/components/atoms/date-range-picker/date-range-picker';
import { InputCurrency } from '@/components/molecules/input-currency/input-currency';
import { CustomSelect } from '@/components/atoms/select/select';
import { MOVEMENT_OPTIONS } from '@/components/organisms/modal-transaction/constants';
import { Input } from '@/components/atoms/input/input';
import dayjs, { Dayjs } from 'dayjs';
import { DialogTitle } from '@mui/material';
import { Button } from '@/components/atoms/button/button';

interface Props {
  onChange: (filter: Filter) => void;
  onClick: () => void;
  filter: Filter;
}

export function TransactionFilter({ onChange, filter, onClick }: Props) {
  const handleDateChange = ({
    start,
    end,
  }: {
    start: Dayjs | null;
    end: Dayjs | null;
  }) => {
    onChange({
      ...filter,
      dateInitial: start ? start.format('YYYY-MM-DD') : '',
      dateFinal: end ? end.format('YYYY-MM-DD') : '',
    });
  };

  const handleValueChange = (newValue: number) => {
    onChange({
      ...filter,
      value: newValue,
    });
  };

  const handleTypeChange = (newType: string) => {
    onChange({
      ...filter,
      type: newType as Transaction['type'],
    });
  };

  const handleInputChange = (field: 'from' | 'to', value: string) => {
    onChange({
      ...filter,
      [field]: value,
    });
  };

  const handleAnexoChange = (anexo: string) => {
    let isAnexo = undefined;
    if (anexo !== undefined) {
      isAnexo = anexo === 'true';
    }
    onChange({
      ...filter,
      anexo: isAnexo,
    });
  };

  return (
    <>
      <DialogTitle>Filtro</DialogTitle>
      <div className="transactions-filter">
        <CustomDateRangePicker
          labelStart="Data Inicial"
          labelEnd="Data Final"
          value={{
            start: dayjs(filter.dateInitial),
            end: dayjs(filter.dateFinal),
          }}
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
          options={MOVEMENT_OPTIONS}
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
