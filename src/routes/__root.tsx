import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { QueryClient } from '@tanstack/react-query';
import GlobalLoader from '@/components/GlobalLoader/GlobalLoader.tsx';

interface MyRouterContext {
  queryClient: QueryClient;
}

const RootLayout = () => (
  <>
    <Outlet />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootLayout,
  pendingComponent: GlobalLoader,
  errorComponent: ({ error }) => {
    console.error('Root route error:', error);
    return (
      <div className="p-8 text-red-600">
        <h2>Auth check failed</h2>
        <pre>{error?.message || error?.toString()}</pre>
      </div>
    );
  },
});
