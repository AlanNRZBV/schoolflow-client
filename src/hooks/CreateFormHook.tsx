import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { Button, TextField } from '@mui/material';

const { fieldContext, formContext } = createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
  },
  formComponents: {
    Button,
  },
  fieldContext,
  formContext,
});
