import React, { useState } from 'react';
import { Props } from '@/components/atoms/input/input.interface';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export function Input({
  label,
  value,
  onChange,
  error,
  helperText,
  className,
  type,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordField = type === 'password';

  return (
    <TextField
      className={`custom-input ${className}`}
      label={label}
      variant="outlined"
      value={value}
      onChange={onChange}
      fullWidth
      error={error}
      type={isPasswordField && showPassword ? 'text' : type}
      helperText={helperText}
      slotProps={
        isPasswordField
          ? {
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }
          : { input: { autoComplete: 'off' } }
      }
    />
  );
}
