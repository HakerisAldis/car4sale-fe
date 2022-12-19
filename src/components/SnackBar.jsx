import React from 'react';
import { Snackbar } from '@mui/material';
import { Slide, Alert } from '@mui/material';

const SnackBar = ({ open, handleClose, message, variant }) => {
  function Transition(props) {
    return <Slide {...props} direction="left" />;
  }

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={variant} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackBar;