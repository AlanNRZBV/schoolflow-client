import './index.css';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { CssBaseline } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/api/queryClient.ts';
import router from '@/router.tsx';
import routerConfig from '@/router.tsx';
import { ErrorBoundary } from 'react-error-boundary';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ErrorBoundary fallback={<div>error boundary</div>}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={routerConfig} />
        </QueryClientProvider>
      </ErrorBoundary>
    </StrictMode>
  );
}
