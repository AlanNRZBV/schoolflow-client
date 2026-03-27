import { useAppForm } from '@/hooks/CreateFormHook.tsx';
import { z } from 'zod';
import { Box, IconButton, InputAdornment, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { CustomLink } from '@/components/UI';

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
  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: z.object({
        email: z.string(),
        password: z.string().min(4),
      }),
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });
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
          flexDirection={{ sm: 'row', xs: 'column' }}
          alignSelf="flex-end"
          gap={1}
        >
          <Typography variant="body1" color="text.secondary">
            Нет, аккаунта?
          </Typography>
          <CustomLink to="/auth/sign-up">Регистрация</CustomLink>
        </Box>
      </Box>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await form.handleSubmit();
        }}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <form.AppField
            name="email"
            children={(field) => <field.TextField label="Почта" />}
          />
          <form.AppField
            name="password"
            children={(field) => (
              <field.TextField
                label="Пароль"
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
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
          <Box display="flex">
            <CustomLink to="/auth/forgot-password" marginLeft="auto">
              Забыли пароль?
            </CustomLink>
          </Box>
        </Box>
        <form.AppForm>
          <form.Button
            variant="contained"
            size="large"
            fullWidth
            sx={{ marginTop: { xs: 4, lg: 6 } }}
          >
            Войти
          </form.Button>
        </form.AppForm>
      </form>
    </Box>
  );
};

export default AuthForm;
