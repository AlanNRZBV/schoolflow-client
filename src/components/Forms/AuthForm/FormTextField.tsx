import React from 'react';
import { TextField, type TextFieldProps } from '@mui/material';
import { getErrorMessage } from '@/lib/utils';

export interface StringFieldApi {
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

interface FormTextFieldProps extends Omit<
  TextFieldProps,
  'name' | 'value' | 'onChange' | 'onBlur' | 'error' | 'helperText'
> {
  field: StringFieldApi;
  onValueChange?: (value: string) => void;
}

export const FormTextField = ({
  field,
  onValueChange,
  ...rest
}: FormTextFieldProps) => {
  const { isTouched, errors } = field.state.meta;
  const hasError = isTouched && errors.length > 0;

  return (
    <TextField
      {...rest}
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
    />
  );
};
