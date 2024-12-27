import React from 'react';
import { props } from '@/components/atoms/select/select.type';
import './style.scss';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

export function CustomSelect({
  value,
  onChange,
  options,
  label,
  helperText,
  error,
}: props) {
  return (
    <FormControl fullWidth error={error}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        label={label}
        className="custom-select"
      >
        {options.map(({ value, text }, index) => (
          <MenuItem key={index} value={value}>
            {text}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
