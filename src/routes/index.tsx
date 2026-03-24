import { createFileRoute } from '@tanstack/react-router';
import { Container } from '@mui/material';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <Container maxWidth="xl" sx={{ height: '100vh' }}>
      main page
    </Container>
  );
}
