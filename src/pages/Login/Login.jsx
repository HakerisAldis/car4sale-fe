import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useAuth from '../../hooks/useAuth';
import SnackBar from '../../components/SnackBar';

export default function Login() {
  const { login } = useAuth();
  const [showError, setShowError] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      await login(data.get('email'), data.get('password'));
    } catch (e) {
      if (e.response.status === 401) {
        setShowError(true);
      } else {
        setShowSnackbar(true);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ minHeight: '100vh' }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Prisijungimas
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            type="email"
            label="El. pašto adresas"
            name="email"
            autoComplete="email"
            autoFocus
            error={showError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Slaptažodis"
            type="password"
            id="password"
            autoComplete="current-password"
            error={showError}
          />
          {showError && <Typography variant="body2" color={'error'}>Neteisingi prisijungimo duomenys</Typography> }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Prisijungti
          </Button>
        </Box>
      </Box>
      <SnackBar open={showSnackbar} handleClose={() => setShowSnackbar(false)} message="Sistemos klaida!" variant="error" />
    </Container>
  );
}