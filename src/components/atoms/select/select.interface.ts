import { SelectChangeEvent } from '@mui/material';

export interface Option {
  value: string;
  text: string;
}

export interface Props {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  options: Option[];
  label: string;
  error?: boolean;
  helperText?: string;
}
