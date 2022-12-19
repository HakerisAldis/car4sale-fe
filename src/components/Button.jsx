import { Button } from '@mui/material';
import { styled } from '@mui/material';
import { grey } from '@mui/material/colors';

export const CustomButton = styled(Button)(({ theme }) => ({
  color: grey[900],
  borderColor: grey[900],
  '&:hover': {
    color: grey[50],
    borderColor: grey[50]
  },
}));