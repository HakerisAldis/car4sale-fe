import { Container, CircularProgress, Typography, SpeedDial, SpeedDialIcon, SpeedDialAction, Backdrop, Box } from '@mui/material';
import { Grid } from '@mui/material';
import React, { useState } from 'react'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useMyVehicles } from '../../models/user/useMyVehicles';
import CarAd from '../Main/CarAd';
import NewAdDialog from '../Main/NewAdDialog';

const MyVehicles = () => {
  const { data: vehicles, isLoading } = useMyVehicles();
  const [openSpeedDial, setOpenSpeedDial] = useState(false);
  const [openNewAdDialog, setOpenNewAdDialog] = useState(false);

  const handleOpenNewAdDialog = () => {
    setOpenSpeedDial(false);
    setOpenNewAdDialog(true);
  };

  return (
      <Box sx={{ minHeight: '100vh' }}>
        <Typography component="h1" variant="h4" align="center" sx={{ mx: 'auto', my: 5 }}>Mano automobiliai</Typography>
        <Container sx={{ py: 4 }} maxWidth="md">
          <Grid container spacing={4}>
            {isLoading && <CircularProgress sx={{ mx: 'auto' }} />}
            {!isLoading && vehicles && vehicles.length > 0 && vehicles.map((item) => (
              <CarAd key={item.id} vehicle={item} myVehicle={true} />
            ))}
          </Grid>
        </Container>
        <Backdrop open={openSpeedDial} />
        <SpeedDial
          ariaLabel="Add new ad"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          onClose={() => setOpenSpeedDial(false)}
          onOpen={() => setOpenSpeedDial(true)}
          open={openSpeedDial}
        >
          <SpeedDialAction
            key="addNew"
            icon={<DirectionsCarIcon />}
            tooltipTitle="Pridėti naują skelbimą"
            tooltipOpen
            onClick={handleOpenNewAdDialog}
          />
        </SpeedDial>
        <NewAdDialog open={openNewAdDialog} setOpen={setOpenNewAdDialog} />
      </Box>
  );
}

export default MyVehicles;