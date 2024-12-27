import { SelectChangeEvent } from '@mui/material';
import { ReactNode } from 'react';

export type Option = {
  value: string;
  text: string;
};

export type props = {
  value: string;
  onChange: (event: SelectChangeEvent, child: ReactNode) => void;
  options: Option[];
  label: string;
  error?: boolean;
  helperText?: string;
};
