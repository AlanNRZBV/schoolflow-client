import { createRouter, useRouter } from '@tanstack/react-router';
import { queryClient } from '@/api/queryClient.ts';
import { routeTree } from '@/routeTree.gen.ts';

const router = createRouter({
  routeTree,
  context: { queryClient },

  defaultErrorComponent: ({ error }) => {
    const routerInstance = useRouter();
    return (
      <div>
        <p>Something went wrong: {error.message}</p>
        <button
          onClick={() => {
            routerInstance.invalidate();
          }}
        >
          Retry
        </button>
      </div>
    );
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default router;
