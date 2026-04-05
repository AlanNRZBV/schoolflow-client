import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { QueryClient } from '@tanstack/react-query';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { formDevtoolsPlugin } from '@tanstack/react-form-devtools';
import { GlobalLoader } from '@/components/Global';
import { Paper } from '@mui/material';

interface MyRouterContext {
  queryClient: QueryClient;
}

const RootLayout = () => (
  <Paper sx={{ backgroundColor: 'background.default' }}>
    <Outlet />
    <TanStackRouterDevtools />
    <TanStackDevtools plugins={[formDevtoolsPlugin()]} />
  </Paper>
);

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootLayout,
  pendingComponent: GlobalLoader,
  errorComponent: ({ error }) => {
    return (
      <div className="p-8 text-red-600">
        <pre>{error?.message || error?.toString()}</pre>
      </div>
    );
  },
});
