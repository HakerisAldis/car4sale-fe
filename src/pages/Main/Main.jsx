import { Container, CircularProgress, Typography, SpeedDial, SpeedDialIcon, SpeedDialAction, Backdrop, Box } from '@mui/material';
import { Grid } from '@mui/material';
import React, { useState } from 'react'
import { useVehicles } from '../../models/vehicle/useVehicles';
import CarAd from './CarAd';
import Filter from './Filter';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import NewAdDialog from './NewAdDialog';
import useAuth from '../../hooks/useAuth';

const Main = () => {
  const [filters, setFilters] = useState({city: '', lot: ''});
  const { data: vehicles, isLoading } = useVehicles(filters.city, filters.lot);
  const [openSpeedDial, setOpenSpeedDial] = useState(false);
  const [openNewAdDialog, setOpenNewAdDialog] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleOpenNewAdDialog = () => {
    setOpenSpeedDial(false);
    setOpenNewAdDialog(true);
  };

  return (
      <Box sx={{ minHeight: '100vh' }}>
        <Filter filters={filters} setFilters={setFilters} />
        <Container sx={{ py: 4 }} maxWidth="md">
          <Grid container spacing={4}>
            {(filters.city === '' || filters.lot === '') && <Typography component="h4" variant="h4" align="center" sx={{ mx: 'auto' }}>Pasirinkite miestą ir aikštelę</Typography>}
            {isLoading && <CircularProgress sx={{ mx: 'auto' }} />}
            {!isLoading && vehicles && vehicles.length === 0 && <Typography component="h4" variant="h4" align="center" sx={{ mx: 'auto' }}>Automobilių nerasta</Typography>}
            {!isLoading && vehicles && vehicles.length > 0 && vehicles.map((item) => (
              <CarAd key={item.id} vehicle={item} />
            ))}
          </Grid>
        </Container>
        {isAuthenticated && (
          <>
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
          </>
        )}
      </Box>
  );
}

export default Main;