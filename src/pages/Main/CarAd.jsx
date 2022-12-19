import React, { useState } from 'react';
import { Grid, Button, Box } from '@mui/material';
import { CardMedia } from '@mui/material';
import { CardContent, CardActions } from '@mui/material';
import { Card } from '@mui/material';
import { Typography } from '@mui/material';
import AdDetailsModal from './AdDetailsModal';
import Moment from 'moment';
import { vehicle as model } from '../../models/vehicle/vehicle';
import SnackBar from '../../components/SnackBar';
import { queryClient } from '../../services/queryClient';
import AdEditModal from './AdEditDialog';

const CarAd = ({ vehicle, myVehicle = false }) => {
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleDelete = async () => {
    try {
      await model.delete(vehicle.cityId, vehicle.lotId, vehicle.id);
      await queryClient.refetchQueries(['my-vehicles'], { active: true })
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Grid item xs={12} sm={6} md={4} sx={{ '&:hover': { cursor: 'pointer' } }}>
        <Card
          sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <Box onClick={() => setOpen(true)}>
            <CardMedia
              component="img"
              sx={{
                maxWidth: '600px'
              }}
              image="https://source.unsplash.com/random"
              alt="random"
            />
            <CardContent sx={{ flexGrow: 2 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {`${vehicle.make} ${vehicle.model}`}
              </Typography>
              <Typography>
                {Moment(vehicle.dateOfManufacture).format('YYYY-MM-DD')}
              </Typography>
              <Typography align="right">
                {`${vehicle.price} Eur`}
              </Typography>
            </CardContent>
          </Box>
          {myVehicle && (
            <>
              <CardActions>
                <Button size="small" color="primary" variant="contained" onClick={() => setOpenEditModal(true)}>Redaguoti</Button>
                <Button size="small" color="error" variant="contained" onClick={handleDelete}>Ištrinti</Button>
              </CardActions>
              <SnackBar open={showSnackbar} handleClose={() => setShowSnackbar(false)} message="Skelbimas ištrintas!" variant="success" />
            </>
          )}
        </Card>
      </Grid>
      <AdDetailsModal open={open} setOpen={setOpen} vehicle={vehicle} />
      <AdEditModal open={openEditModal} setOpen={setOpenEditModal} vehicle={vehicle} />
    </>
  );
}

export default CarAd