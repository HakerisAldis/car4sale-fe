import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { PATHS } from '../../routes/routes';
import { user } from '../../models/user/user';
import SnackBar from '../../components/SnackBar';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
  const [showError, setShowError] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setEmailExists(false);

    if (data.get('password') !== data.get('passwordRepeat')) {
      setShowError(true);
      return;
    } else {
      setShowError(false);
    }

    try {
      await user.register(data.get('email'), data.get('password'));
      navigate(PATHS.login);
    } catch (e) {
      if (e.response.status === 409) {
        setEmailExists(true);
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
          Registracija
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="El. pašto adresas"
            name="email"
            autoComplete="email"
            autoFocus
            error={emailExists}
          />
          {emailExists && <Typography variant="body2" color={'error'}>El. pašto adresas jau panaudotas</Typography>}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Slaptažodis"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="passwordRepeat"
            label="Pakartokite slaptažodį"
            type="password"
            id="passwordRepeat"
            autoComplete="current-password"
            error={showError}
          />
          {showError && <Typography variant="body2" color={'error'}>Slaptažodis nesutampa</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registruotis
          </Button>
        </Box>
      </Box>
      <SnackBar open={showSnackbar} handleClose={() => setShowSnackbar(false)} message="Sistemos klaida!" variant="error" />
    </Container>
  );
}