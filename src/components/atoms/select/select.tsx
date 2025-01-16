import React from 'react';
import { Props } from '@/components/atoms/select/select.interface';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  SelectChangeEvent,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export function CustomSelect({
  value,
  onChange,
  options,
  label,
  helperText,
  error,
}: Props) {
  const handleClear = () => {
    onChange({ target: { value: undefined } } as unknown as SelectChangeEvent);
  };

  return (
    <FormControl fullWidth error={error} className="custom-select-container">
      <InputLabel>{label}</InputLabel>
      <div className="select-wrapper">
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
        {value && (
          <IconButton
            onClick={handleClear}
            className="clear-button"
            aria-label="Clear selection"
          >
            <ClearIcon />
          </IconButton>
        )}
      </div>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
