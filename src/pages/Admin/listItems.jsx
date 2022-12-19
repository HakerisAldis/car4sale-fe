import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocalParkingIcon from '@mui/icons-material/LocalParking';

export const MainListItems = ({ setActive }) => {
  <React.Fragment>
    <ListItemButton onClick={() => setActive('city')}>
      <ListItemIcon>
        <LocationCityIcon />
      </ListItemIcon>
      <ListItemText primary="City" />
    </ListItemButton>
    <ListItemButton onClick={() => setActive('lot')}>
      <ListItemIcon>
        <LocalParkingIcon />
      </ListItemIcon>
      <ListItemText primary="Lot" />
    </ListItemButton>
  </React.Fragment>
};