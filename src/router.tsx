import { createRouter, useRouter } from '@tanstack/react-router';
import { queryClient } from '@/api/queryClient.ts';
import { routeTree } from '@/routeTree.gen.ts';

const routerConfig = createRouter({
  routeTree,
  defaultErrorComponent: ({ error }) => {
    const router = useRouter();
    return (
      <div>
        <p>Something went wrong: {error.message}</p>
        <button
          onClick={() => {
            router.invalidate();
          }}
        >
          Retry
        </button>
      </div>
    );
  },
  context: { queryClient },
});

export default routerConfig;
