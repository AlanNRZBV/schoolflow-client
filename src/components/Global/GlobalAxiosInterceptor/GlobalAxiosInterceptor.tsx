import React, { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { api } from '@/api/axiosInstance';
import { useNotification } from '@/context/NotificationContext.tsx';
import { parseApiError } from '@/lib/utils';

export const GlobalAxiosInterceptor = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const isUnauthorized = error.response?.status === 401;
        const isSignInRequest = error.config?.url === '/auth/sign-in';

        if (isUnauthorized && !isSignInRequest) {
          const currentPath = router.state.location.pathname;

          router.navigate({
            to: '/auth/sign-in',
            search: {
              redirect: currentPath,
              expired: true,
            },
            replace: true,
          });
          return Promise.reject(error);
        }
        const { title, message } = parseApiError(error);
        showNotification({
          title,
          message,
          severity: 'error',
        });

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [showNotification, router]);

  return <>{children}</>;
};
