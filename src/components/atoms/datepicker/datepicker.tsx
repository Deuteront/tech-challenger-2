import React from 'react';
import './style.scss';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormControl, FormHelperText } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

dayjs.locale('pt-br');

type CustomDatePickerProps = {
  label: string;
  value: Dayjs | null;
  error?: boolean;
  helperText?: string;
  onChange: (newValue: Dayjs | null) => void;
};

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  value,
  onChange,
  error,
  helperText,
}) => {
  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue && newValue.isBefore(dayjs())) {
      onChange(newValue);
    } else {
      onChange(dayjs());
    }
  };

  return (
    <FormControl fullWidth error={error}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <DatePicker
          label={label}
          onChange={handleDateChange}
          value={value}
          className="custom-input"
        />
      </LocalizationProvider>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
