import { CircularProgress } from '@mui/material'
import { Stack } from '@mui/material'
import { Box } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    <Box sx={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
     }}>
      <Stack direction={'column'}>
        <Box component={'img'} sx={{ maxWidth: '200px', mx: 'auto' }} src="/images/logo.png" alt="logo" />
        <CircularProgress sx={{ mx: 'auto' }} />
      </Stack>
    </Box>
  )
}

export default Loading