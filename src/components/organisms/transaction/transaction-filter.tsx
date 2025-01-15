import React, { useState } from 'react';
import { Chip, Popover, Slider } from '@mui/material';
import { Filter } from '@/service/interfaces';
import { ArrowDropDown } from '@mui/icons-material';
import { getMovementOptionByType } from '@/components/organisms/modal-transaction/constants';
import dayjs, { Dayjs } from 'dayjs';
import { CustomDateRangePicker } from '@/components/atoms/date-range-picker/date-range-picker';
import { Button } from '@/components/atoms/button/button';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  onChange: (filter: Filter) => void;
  filter: Filter;
}

export function TransactionFilter({ onChange, filter }: Props) {
  const { valueInitial, valueFinal, type, dateInitial, dateFinal } = filter;
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openDate, setOpenDate] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [dates, setDates] = useState<Dayjs[]>([dayjs(), dayjs()]);

  const handleOpenPopover = (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    setOpenDate(false);
    setAnchorEl(event.currentTarget);
    setOpenPopover(id);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setOpenPopover(null);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    console.log(newValue);
    onChange({
      ...filter,
      valueInitial: Array.isArray(newValue) ? newValue[0] : 0,
      valueFinal: Array.isArray(newValue) ? newValue[1] : newValue,
    });
  };

  const handleInputChange = (value: number, index: number) => {
    const newRange = [valueInitial, valueFinal] as [number, number];
    newRange[index] = Math.max(0, Math.min(50000, value));
    if (newRange[0] > newRange[1]) {
      newRange[0] = newRange[1];
    }
    if (newRange[0] <= newRange[1]) {
      onChange({
        ...filter,
        valueInitial: newRange[0],
        valueFinal: newRange[1],
      });
    }
  };

  const isValidDate = (date: Dayjs | null): boolean => {
    return !!date && date.isValid();
  };

  const handleDateFilterChange = (option: string) => {
    let newDateInitial = '';
    let newDateFinal = '';

    switch (option) {
      case 'hoje':
        newDateInitial = dayjs().startOf('day').toISOString();
        newDateFinal = dayjs().endOf('day').toISOString();
        break;
      case 'ultimos7dias':
        newDateInitial = dayjs()
          .subtract(7, 'day')
          .startOf('day')
          .toISOString();
        newDateFinal = dayjs().endOf('day').toISOString();
        break;
      case 'ultimos30dias':
        newDateInitial = dayjs()
          .subtract(30, 'day')
          .startOf('day')
          .toISOString();
        newDateFinal = dayjs().endOf('day').toISOString();
        break;
      case 'esseano':
        newDateInitial = dayjs().startOf('year').toISOString();
        newDateFinal = dayjs().endOf('year').toISOString();
        break;
      case 'personalizado':
        setOpenDate(true);
        return;
    }

    onChange({
      ...filter,
      dateInitial: newDateInitial,
      dateFinal: newDateFinal,
    });
    handleClosePopover();
  };

  const sendDateFilter = () => {
    onChange({
      ...filter,
      dateInitial: isValidDate(dates[0])
        ? dates[0].startOf('day').toISOString()
        : '',
      dateFinal: isValidDate(dates[1])
        ? dates[1].endOf('day').toISOString()
        : '',
    });
    handleClosePopover();
  };

  const getLabelDataFilter = () => {
    if (dateInitial && dateFinal) {
      return `${dayjs(dateInitial).format('DD/MM/YYYY')} - ${dayjs(
        dateFinal
      ).format('DD/MM/YYYY')}`;
    } else if (dateInitial) {
      return dayjs(dateInitial).format('DD/MM/YYYY');
    } else if (dateFinal) {
      return dayjs(dateFinal).format('DD/MM/YYYY');
    } else {
      return 'Selecionar Data';
    }
  };

  return (
    <>
      <div className={'transactions-filter'}>
        <Chip
          label={getLabelDataFilter()}
          icon={
            <ArrowDropDown
              className={!!dateInitial || !!dateFinal ? 'selected-value' : ''}
            />
          }
          onDelete={
            !!dateInitial || !!dateFinal
              ? () => onChange({ ...filter, dateInitial: '', dateFinal: '' })
              : undefined
          }
          className={!!dateInitial || !!dateFinal ? 'selected-value' : ''}
          onClick={(e) => handleOpenPopover(e, 'date')}
          style={{ cursor: 'pointer' }}
        />
        <Popover
          open={openPopover === 'date'}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          disableScrollLock
        >
          <div className="container-filter-date">
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
              <li
                className={'button-filter'}
                onClick={() => handleDateFilterChange('hoje')}
              >
                Hoje
              </li>
              <li
                className={'button-filter'}
                onClick={() => handleDateFilterChange('ultimos7dias')}
              >
                Últimos 7 dias
              </li>
              <li
                className={'button-filter'}
                onClick={() => handleDateFilterChange('ultimos30dias')}
              >
                Últimos 30 dias
              </li>
              <li
                className={'button-filter'}
                onClick={() => handleDateFilterChange('esseano')}
              >
                Este ano
              </li>
              <li
                className={'button-filter'}
                onClick={() => handleDateFilterChange('personalizado')}
              >
                Personalizado
              </li>
            </ul>
            {openDate && (
              <div
                style={{
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div className={'container-date'}>
                  <CustomDateRangePicker
                    labelStart="Data Inicial"
                    labelEnd="Data Final"
                    value={{ start: dayjs(dates[0]), end: dayjs(dates[1]) }}
                    onChange={({ start, end }) =>
                      setDates([start, end] as [Dayjs, Dayjs])
                    }
                  ></CustomDateRangePicker>
                </div>
                <div className={'button-apply-left'}>
                  <Button className={['button-date']} onClick={sendDateFilter}>
                    Aplicar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Popover>

        <Chip
          label={getMovementOptionByType(type) || 'Movimentação'}
          icon={<ArrowDropDown className={!!type ? 'selected-value' : ''} />}
          className={!!type ? 'selected-value' : ''}
          onClick={(e) => handleOpenPopover(e, 'type')}
          style={{ cursor: 'pointer' }}
          onDelete={
            !!type ? () => onChange({ ...filter, type: '' }) : undefined
          }
        />
        <Popover
          open={openPopover === 'type'}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          disableScrollLock
        >
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            <li
              className={'button-filter'}
              onClick={() => {
                onChange({ ...filter, type: 'Debit' });
                handleClosePopover();
              }}
            >
              Saída
            </li>
            <li
              className={'button-filter'}
              onClick={() => {
                onChange({ ...filter, type: 'Credit' });
                handleClosePopover();
              }}
              style={{ textTransform: 'none' }}
            >
              Entrada
            </li>
          </ul>
        </Popover>

        <Chip
          label={'Valor'}
          className={
            (valueFinal || 0) + (valueInitial || 0) > 0 ? 'selected-value' : ''
          }
          onClick={(e) => handleOpenPopover(e, 'range')}
          onDelete={
            (valueFinal || 0) + (valueInitial || 0) > 0
              ? () =>
                  onChange({
                    ...filter,
                    valueInitial: 0,
                    valueFinal: 0,
                  })
              : undefined
          }
          style={{ cursor: 'pointer' }}
          icon={
            <ArrowDropDown
              className={
                (valueFinal || 0) + (valueInitial || 0) > 0
                  ? 'selected-value'
                  : ''
              }
            />
          }
        />
        <Popover
          open={openPopover === 'range'}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          disableScrollLock
        >
          <div className={'range-container'}>
            <div className={'container-input-slider'}>
              <span className={'money'}>R$</span>
              <input
                type="number"
                className={'input-slider'}
                value={valueInitial}
                onChange={(e) => handleInputChange(Number(e.target.value), 0)}
                min={0}
                max={50000}
              />
            </div>
            <Slider
              value={[valueInitial || 0, valueFinal || 0]}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              min={0}
              max={50000}
              size={'medium'}
              color={'primary'}
              marks={[{ value: 0 }, { value: 50000 }]}
            />
            <div className={'container-input-slider'}>
              <span className={'money'}>R$</span>
              <input
                type="number"
                className={'input-slider'}
                value={valueFinal}
                onChange={(e) => handleInputChange(Number(e.target.value), 1)}
                min={0}
                max={50000}
              />
            </div>
          </div>
        </Popover>
      </div>
      <div className={'search-container'}>
        <input
          type="text"
          placeholder="Pesquisar"
          className={'search-input'}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <span
          className={'button-search'}
          onClick={() => onChange({ ...filter, text })}
        >
          <SearchIcon />
        </span>
      </div>
    </>
  );
}
