import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/staff')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/staff/"!</div>;
}
