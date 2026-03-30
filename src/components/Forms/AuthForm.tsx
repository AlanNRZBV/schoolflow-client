import { useAppForm } from '@/hooks/CreateFormHook.tsx';
import { Box, IconButton, InputAdornment, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { CustomLink } from '@/components/UI';
import { useSignIn } from '@/hooks/useSignIn.ts';
import { signInSchema, signInSchemaDefaultValues } from '@/lib/zodSchemas';

const AuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

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

  const signInMutation = useSignIn();

  const form = useAppForm({
    defaultValues: signInSchemaDefaultValues,
    validators: {
      onSubmit: signInSchema,
    },
    onSubmit: async ({ value }) => {
      await signInMutation.mutateAsync(value);
    },
  });

  const clearError = () => {
    if (signInMutation.isError) signInMutation.reset();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      pl={{ xs: 0, md: 3, lg: 4 }}
      pr={{ xs: 0 }}
      width={{ xs: '100%', sm: '75%', md: '100%' }}
      maxWidth={{ lg: '650px' }}
    >
      <Box display="flex" justifyContent="space-between" mb={{ xs: 4, lg: 6 }}>
        <Typography variant="h3" color="text.primary">
          Войдите
        </Typography>
        <Box
          display="flex"
          flexDirection={{ lg: 'row', xs: 'column' }}
          alignSelf="flex-end"
          gap={1}
        >
          <Typography variant="body1" color="text.secondary">
            Нет, аккаунта?
          </Typography>
          <CustomLink to="/auth/sign-up">Как получить доступ</CustomLink>
        </Box>
      </Box>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await form.handleSubmit();
        }}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" flexDirection="column" gap={2}>
            <form.AppField
              name="email"
              children={(field) => {
                console.log(field.state.meta.errors);
                console.log(field.state);
                const isTouched = field.state.meta.isTouched;
                const errors = field.state.meta.errors;
                const hasError = isTouched && errors.length > 0;
                const fieldErrors = field.state.meta.errors.filter(
                  (e) => !!e && (!e?.path || e.path[0] === field.name)
                );
                const errorMessage = fieldErrors
                  .map((e: any) => e.message ?? e)
                  .join(', ');
                return (
                  <field.TextField
                    label="Почта"
                    error={hasError}
                    helperText={hasError ? errorMessage : '\u00A0'}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                      clearError();
                    }}
                  />
                );
              }}
            />
            <form.AppField
              name="password"
              children={(field) => {
                const isTouched = field.state.meta.isTouched;
                const errors = field.state.meta.errors;
                const hasError = isTouched && errors.length > 0;
                const fieldErrors = field.state.meta.errors.filter(
                  (e) => !!e && (!e?.path || e.path[0] === field.name)
                );
                const errorMessage = fieldErrors
                  .map((err: any) => err.message ?? err)
                  .join(', ');
                return (
                  <field.TextField
                    label="Пароль"
                    error={hasError}
                    helperText={hasError ? errorMessage : '\u00A0'}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                      clearError();
                    }}
                    type={showPassword ? 'text' : 'password'}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label={
                                showPassword
                                  ? 'hide the password'
                                  : 'display the password'
                              }
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              onMouseUp={handleMouseUpPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                );
              }}
            />
          </Box>
          <Box display="flex">
            <CustomLink to="/auth/forgot-password" marginLeft="auto">
              Забыли пароль?
            </CustomLink>
          </Box>
        </Box>
        <form.AppForm>
          <form.Button
            variant="contained"
            type="submit"
            size="large"
            fullWidth
            disabled={signInMutation.isPending}
            loading={signInMutation.isPending}
            sx={{ marginTop: { xs: 4, lg: 6 } }}
          >
            {signInMutation.isPending ? 'Входим...' : 'Войти'}
          </form.Button>
        </form.AppForm>
      </form>
    </Box>
  );
};

export default AuthForm;
