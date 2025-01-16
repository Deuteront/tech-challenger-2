import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import { CustomDatePicker } from '@/components/atoms/datepicker/datepicker';

dayjs.locale('pt-br');

interface CustomDateRangePickerProps {
  labelStart: string;
  labelEnd: string;
  value: { start: Dayjs | null; end: Dayjs | null };
  onChange: (newValue: { start: Dayjs | null; end: Dayjs | null }) => void;
  error?: boolean;
  helperText?: string;
}

export const CustomDateRangePicker: React.FC<CustomDateRangePickerProps> = ({
  labelStart,
  labelEnd,
  value,
  onChange,
  error,
  helperText,
}) => {
  const handleStartDateChange = (newStart: Dayjs | null) => {
    if (newStart && value.end && newStart.isAfter(value.end)) {
      onChange({ start: newStart, end: newStart });
    } else {
      onChange({ start: newStart, end: value.end });
    }
  };

  const handleEndDateChange = (newEnd: Dayjs | null) => {
    if (newEnd && value.start && newEnd.isBefore(value.start)) {
      onChange({ start: value.start, end: newEnd });
    } else {
      onChange({ start: value.start, end: newEnd });
    }
  };

  return (
    <>
      <CustomDatePicker
        label={labelStart}
        value={value.start}
        onChange={handleStartDateChange}
        error={error}
        helperText={helperText}
      />
      <CustomDatePicker
        label={labelEnd}
        value={value.end}
        onChange={handleEndDateChange}
        error={error}
        helperText={helperText}
      />
    </>
  );
};
