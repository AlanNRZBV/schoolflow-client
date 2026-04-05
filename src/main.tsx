import './index.css';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/api';
import router from '@/router.tsx';
import { ErrorBoundary } from 'react-error-boundary';
import theme from '@/theme.ts';
import { GlobalAxiosInterceptor } from '@/components/Global/GlobalAxiosInterceptor/GlobalAxiosInterceptor.tsx';

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ErrorBoundary fallback={<div>error boundary</div>}>
        <NotificationProvider>
          <GlobalAxiosInterceptor>
            <ThemeProvider theme={theme}>
              <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <CssBaseline />
              </QueryClientProvider>
            </ThemeProvider>
          </GlobalAxiosInterceptor>
        </NotificationProvider>
      </ErrorBoundary>
    </StrictMode>
  );
}
