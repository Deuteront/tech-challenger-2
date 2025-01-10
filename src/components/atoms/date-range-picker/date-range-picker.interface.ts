import dayjs, { Dayjs } from 'dayjs';
import { DateRange } from '@mui/x-date-pickers-pro';

export interface Props {
  label: string;
  value?: DateRange<Dayjs>;
  error?: boolean;
  helperText?: string;
  onChange: (newValue: DateRange<dayjs.Dayjs>) => void;
}
