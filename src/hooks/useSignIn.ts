import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearch } from '@tanstack/react-router';
import { api } from '@/api/axiosInstance.ts';
import { z } from 'zod';
import { ROLE_KEYS } from '@/lib/constants/roles.ts';
import { useNotification } from '@/context/NotificationContext.tsx';

const signInResponseSchema = z.object({
  message: z.string(),
  user: z.object({
    role: z.enum(ROLE_KEYS),
  }),
});

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const search = useSearch({ strict: false });
  const { showNotification } = useNotification();
  return useMutation({
    mutationFn: async (value: { email: string; password: string }) => {
      const res = await api.post('/auth/sign-in', value);
      return signInResponseSchema.parse(res.data);
    },
    onSuccess: async (data) => {
      queryClient.setQueryData(['auth','me'],data.user)
      const role = data.user.role;
      let rolePath = '/dashboard';

      if (role === 'superAdmin' || role === 'admin') {
        rolePath = '/dashboard/admin';
      } else if (role === 'supervisor') {
        rolePath = '/dashboard/supervisor';
      } else if (role === 'student' || role === 'parent') {
        rolePath = '/dashboard/student';
      } else if (role === 'staff') {
        rolePath = '/dashboard/staff';
      }

      const searchParams = search as { redirect?: string };
      const redirectTo = searchParams.redirect || rolePath;
      await router.navigate({ to: redirectTo, replace: true });
    },
    onError: (error) => {
      if (error instanceof z.ZodError) {
        showNotification({
          title: 'Ошибка сервера',
          message: 'Неверный формат данных',
          severity: 'error',
        });
      }
    },
  });
};
