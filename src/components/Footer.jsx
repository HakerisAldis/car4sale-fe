import { Box, Typography } from '@mui/material';
import React from 'react';

const Footer = () => {
  return (
    <Box component={'div'} sx={{ backgroundColor: 'secondary.main', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="h6" align="center">
        {'© 2022, All rights reserved.'}
      </Typography>
    </Box>
  )
}

export default Footer;