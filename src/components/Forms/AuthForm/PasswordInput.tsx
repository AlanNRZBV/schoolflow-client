import React, { useState } from 'react';
import {
  IconButton,
  InputAdornment,
  TextField,
  type TextFieldProps,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { getErrorMessage } from '@/lib/utils';

interface StringFieldApi {
  name: string;
  state: {
    value: string;
    meta: {
      isTouched: boolean;
      errors: unknown[];
    };
  };
  handleChange: (value: string) => void;
  handleBlur: () => void;
}

interface FormPasswordInputProps extends Omit<
  TextFieldProps,
  'name' | 'value' | 'onChange' | 'onBlur' | 'type' | 'error' | 'helperText'
> {
  field: StringFieldApi;
  onValueChange?: (value: string) => void;
}

export const FormPasswordInput = ({
  field,
  onValueChange,
  slotProps,
  ...rest
}: FormPasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const { isTouched, errors } = field.state.meta;
  const hasError = isTouched && errors.length > 0;

  return (
    <TextField
      {...rest}
      type={showPassword ? 'text' : 'password'}
      name={field.name}
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (onValueChange) {
          onValueChange(newValue);
        } else {
          field.handleChange(newValue);
        }
      }}
      error={hasError}
      helperText={hasError ? getErrorMessage(errors) : '\u00A0'}
      slotProps={{
        input: {
          ...slotProps?.input,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
