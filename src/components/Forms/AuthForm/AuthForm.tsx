import { Alert, Box, Typography } from '@mui/material';
import { useAppForm } from '@/hooks/CreateFormHook.tsx';
import { CustomLink } from '@/components/UI';
import { useSignIn } from '@/hooks/useSignIn.ts';
import { signInSchema, signInSchemaDefaultValues } from '@/lib/zodSchemas';
import { FormPasswordInput, FormTextField } from '@/components/Forms';
import { useSearch } from '@tanstack/react-router';

const AuthForm = () => {
  const signInMutation = useSignIn();
  const { expired } = useSearch({ from: '/auth/sign-in' });

  const form = useAppForm({
    defaultValues: signInSchemaDefaultValues,
    validators: {
      onSubmit: signInSchema,
    },
    onSubmit: async ({ value }) => {
      await signInMutation.mutateAsync(value);
    },
  });

  const handleFieldChange = (
    onChangeFn: (value: string) => void,
    value: string
  ) => {
    onChangeFn(value);
    if (signInMutation.isError) {
      signInMutation.reset();
    }
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
      {expired && (
        <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
          Время вашей сессии истекло. Пожалуйста, войдите снова.
        </Alert>
      )}
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
            Нет аккаунта?
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
              children={(field) => (
                <FormTextField
                  field={field}
                  label="Email"
                  onValueChange={(val: string) =>
                    handleFieldChange(field.handleChange, val)
                  }
                />
              )}
            />

            <form.AppField
              name="password"
              children={(field) => (
                <FormPasswordInput
                  field={field}
                  label="Пароль"
                  onValueChange={(val: string) =>
                    handleFieldChange(field.handleChange, val)
                  }
                />
              )}
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
