import { Dayjs } from 'dayjs';

export interface CustomDatePickerProps {
  label: string;
  value: Dayjs | null;
  error?: boolean;
  helperText?: string;
  onChange: (newValue: Dayjs | null) => void;
}
