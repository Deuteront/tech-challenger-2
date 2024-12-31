import React from 'react';

export interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  value?: string;
  error?: boolean;
  helperText?: string;
  className?: string;
  type?: string;
}
