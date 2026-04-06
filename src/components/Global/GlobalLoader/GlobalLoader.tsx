import { CircularProgress, Container, Grid } from '@mui/material';

const GlobalLoader = () => {
  return (
    <Container maxWidth="xl" sx={{ height: '100vh' }}>
      <Grid container height="100%">
        <Grid
          size={12}
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          <CircularProgress size={100} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default GlobalLoader;
