import React, { useEffect, useState } from 'react';
import { Input } from '@/components/atoms/input/input';

interface InputCurrencyProps {
  label: string;
  value: number;
  error?: boolean;
  helperText?: string;
  onChange: (value: number) => void;
}

export function InputCurrency({
  label,
  value,
  onChange,
  error,
  helperText,
}: InputCurrencyProps) {
  const [displayValue, setDisplayValue] = useState('');

  useEffect(() => {
    setDisplayValue(formatCurrency(value));
  }, [value]);

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(num);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/\D/g, '');

    if (inputValue === '') {
      setDisplayValue('');
      onChange(0);
    } else {
      const numericValue = parseFloat(inputValue) / 100;
      setDisplayValue(formatCurrency(numericValue));
      onChange(numericValue);
    }
  };

  return (
    <Input
      label={label}
      value={displayValue}
      onChange={handleChange}
      error={error}
      type="text"
      helperText={helperText}
    />
  );
}
