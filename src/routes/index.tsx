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
      <Box display="flex" gap={2}>
        <CustomLink to="/auth/sign-in">Sign In</CustomLink>
        <CustomLink to="/auth/sign-up">Sign Up</CustomLink>
        <CustomLink to="/auth/forgot-password">Forgot Password</CustomLink>
        <CustomLink to="/dashboard/admin" preload={false}>
          Admin
        </CustomLink>
        <CustomLink to="/dashboard/staff" preload={false}>
          staff
        </CustomLink>
        <CustomLink to="/dashboard/student" preload={false}>
          student
        </CustomLink>
      </Box>
    </Container>
  );
}
