import { createFileRoute } from '@tanstack/react-router';
import { Container, Grid } from '@mui/material';

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container maxWidth="xl" sx={{ border: '1px solid red', height: '100vh' }}>
      <Grid container height="100%">
        <Grid alignItems="center" container border="1px solid green" size={6}>
          <Grid size={12} border="1px solid blue">
            kartinka
          </Grid>
        </Grid>
        <Grid size={6}>2</Grid>
      </Grid>
    </Container>
  );
}
