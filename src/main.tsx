import './index.css';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/api/queryClient.ts';
import router from '@/router.tsx'; // ← только один импорт
import { ErrorBoundary } from 'react-error-boundary';
import theme from '@/theme.ts';

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ErrorBoundary fallback={<div>error boundary</div>}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <CssBaseline />
          </QueryClientProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </StrictMode>
  );
}
