import React from 'react';
import { Dialog, DialogTitle, DialogActions, DialogContent, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { vehicle as model } from '../../models/vehicle/vehicle';
import Moment from 'moment';
import { queryClient } from '../../services/queryClient';

const AdEditModal = ({ open, setOpen, vehicle }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      make: formData.get('make'),
      model: formData.get('model'),
      dateOfManufacture: formData.get('dateOfManufacture'),
      fuelType: formData.get('fuelType'),
      gearBox: formData.get('gearBox'),
      engineCapacity: formData.get('engineCapacity'),
      price: formData.get('price'),
    };
    
    try {
      await model.update(vehicle.cityId, vehicle.lotId, vehicle.id, data);
      await queryClient.refetchQueries(['my-vehicles'], { active: true });
      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          '& .MuiFormControl-root': { m: 1, width: 360},
        }}
        maxWidth={'xs'}
        component="form"
        onSubmit={handleSubmit}
      >
        <DialogTitle>Automobilio redagavimas</DialogTitle>
        <DialogContent>
          <TextField label="Gamintojas" name="make" defaultValue={vehicle.make} required />
          <TextField label="Modelis" name="model" defaultValue={vehicle.model} required />
          <TextField name="dateOfManufacture" type="date" defaultValue={Moment(vehicle.dateOfManufacture).format('YYYY-MM-DD')} required />
          <FormControl>
            <InputLabel>Kuro tipas</InputLabel>
            <Select label="Kuro tipas" name="fuelType" defaultValue={vehicle.fuelType} required>
              <MenuItem value="petrol">Benzinas</MenuItem>
              <MenuItem value="diesel">Dyzelinas</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Pavarų dėžės tipas</InputLabel>
            <Select label="Pavarų dėžės tipas" name="gearBox" defaultValue={vehicle.gearBox} required>
              <MenuItem value="manual">Mechaninė</MenuItem>
              <MenuItem value="automatic">Automatinė</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Variklio tūris" name="engineCapacity" type="number" defaultValue={vehicle.engineCapacity} required />
          <TextField label="Kaina" name="price" type="number" defaultValue={vehicle.price} required />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpen(false)}>Atšaukti</Button>
          <Button variant="contained" type="submit">Atnaujinti</Button>
        </DialogActions>
      </Dialog>
  )
}

export default AdEditModal;