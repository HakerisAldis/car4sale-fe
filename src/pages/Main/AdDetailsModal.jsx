import React from 'react'
import { Modal, Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SettingsIcon from '@mui/icons-material/Settings';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EuroIcon from '@mui/icons-material/Euro';
import Moment from 'moment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 380,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const AdDetailsModal = ({ vehicle, open, setOpen }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="ad-modal-title"
        aria-describedby="ad-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {`${vehicle.make} ${vehicle.model}`}
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText primary={Moment(vehicle.dateOfManufacture).format('YYYY-MM-DD')} />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <LocalGasStationIcon />
              </ListItemIcon>
              <ListItemText primary={vehicle.fuelType === 'diesel' ? 'Dyzelinas' : 'Benzinas'} />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={vehicle.gearBox === 'automatic' ? 'Automatinė' : 'Mechaninė'} />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <DirectionsCarIcon />
              </ListItemIcon>
              <ListItemText primary={`${vehicle.engineCapacity} ccm`} />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <EuroIcon />
              </ListItemIcon>
              <ListItemText primary={`${vehicle.price} Eur`} />
            </ListItem>
          </List>
        </Box>
      </Modal>
    </div>
  )
}

export default AdDetailsModal