import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormControl, FormHelperText } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { CustomDatePickerProps } from '@/components/atoms/datepicker/datepicker.interface';

dayjs.locale('pt-br');

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  value,
  onChange,
  error,
  helperText,
}) => {
  const handleDateChange = (newValue: Dayjs | null) => {
    onChange(newValue);
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
