import { type ReactNode, useEffect } from 'react';
import { api } from '@/api/axiosInstance';
import { useNotification } from '@/context/NotificationContext.tsx';
import { parseApiError } from '@/lib/utils/errorHandler.ts';

export const GlobalAxiosInterceptor = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { showNotification } = useNotification();

  useEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,

      (error) => {
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
  }, [showNotification]);

  return <>{children}</>;
};
