import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearch } from '@tanstack/react-router';
import { api } from '@/api/axiosInstance.ts';

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const search = useSearch({ strict: false });
  return useMutation({
    mutationFn: async (value: { email: string; password: string }) => {
      const res = await api.post('/auth/sign-in', value);
      console.log(res.data);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      const searchParams = search as { redirect?: string };
      const redirectTo = searchParams.redirect || '/';
      await router.navigate({ to: redirectTo, replace: true });
    },
  });
};
