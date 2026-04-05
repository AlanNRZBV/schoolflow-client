import { createFileRoute } from '@tanstack/react-router';
import { Box, Container } from '@mui/material';
import { CustomLink } from '@/components/UI';

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
