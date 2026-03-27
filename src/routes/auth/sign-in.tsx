import { createFileRoute } from '@tanstack/react-router';
import { Box, Fade, Grid } from '@mui/material';
import heroImage from '@/assets/hero-human-placeholder.svg';
import { AuthForm } from '@/components/Forms';

export const Route = createFileRoute('/auth/sign-in')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Grid container height="100%">
      <Grid
        alignItems="center"
        container
        size={6}
        borderRight={1}
        borderColor="divider"
        display={{ md: 'inherit', xs: 'none' }}
      >
        <Grid size={12}>
          <Fade
            in={true}
            timeout={750}
            easing="ease-out"
            appear
            mountOnEnter
            unmountOnExit
          >
            <Box
              sx={{
                backgroundImage: `url(${heroImage})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                minHeight: '50vh',
                filter: 'saturate(75%)',
              }}
            />
          </Fade>
        </Grid>
      </Grid>
      <Grid
        size={{ md: 6, xs: 12 }}
        justifyContent="center"
        alignItems="center"
        display="flex"
      >
        <AuthForm />
      </Grid>
    </Grid>
  );
}
