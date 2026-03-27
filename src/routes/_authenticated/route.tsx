import { createFileRoute, isRedirect, redirect } from '@tanstack/react-router';
import { api } from '@/api/axiosInstance.ts';
import { GlobalLoader } from '@/components/Global';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    try {
      await context.queryClient.ensureQueryData({
        queryKey: ['auth', 'me'],
        queryFn: async () => {
          const res = await api.get('/auth/me');
          return res.data;
        },
        staleTime: 24 * 60 * 60 * 1000,
      });
    } catch (e) {
      if (isRedirect(e)) throw e;
      throw redirect({
        to: '/auth/sign-in',
        replace: true,
        search: { redirect: location.href },
      });
    }
  },
  errorComponent: ({ error }) => {
    console.error('Authenticated layout error:', error);
  },
  pendingComponent: GlobalLoader,
});
