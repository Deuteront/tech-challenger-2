import React from 'react';
import { FormControlLabel, Checkbox, FormHelperText } from '@mui/material';

interface CustomCheckboxProps {
  label: string;
  checked: boolean | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  error?: boolean;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  checked,
  onChange,
  helperText,
  error,
}) => {
  return (
    <div className={`custom-checkbox-container ${error ? 'error' : ''}`}>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={onChange}
            color="primary"
            className="custom-checkbox"
          />
        }
        label={label}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </div>
  );
};
