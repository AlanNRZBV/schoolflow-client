import { createFileRoute } from '@tanstack/react-router';
import { Box, Fade, Grid } from '@mui/material';
import heroImage from '@/assets/hero-human-placeholder.svg';
import { AuthForm } from '@/components/Forms';
import { z } from 'zod';
import { CustomLink } from '@/components/UI';

const signInSearchSchema = z.object({
  redirect: z.string().optional().catch('/'),
  expired: z.boolean().optional().catch(false),
});

export const Route = createFileRoute('/auth/sign-in')({
  validateSearch: signInSearchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Grid container height="100%">
      <Grid
        container
        size={6}
        borderRight={1}
        borderColor="divider"
        display={{ md: 'inherit', xs: 'none' }}
      >
        <Grid
          size={12}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
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
3;
