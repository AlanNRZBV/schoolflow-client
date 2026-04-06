import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Container } from '@mui/material';

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container
      maxWidth="xl"
      sx={{ height: '100vh', backgroundColor: 'background.default' }}
    >
      <Outlet />
    </Container>
  );
}
