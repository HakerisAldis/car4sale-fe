import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogActions, DialogContent, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useCities } from '../../models/city/useCities';
import { useLots } from '../../models/lot/useLots';
import { vehicle } from '../../models/vehicle/vehicle';

const NewAdDialog = ({ open, setOpen }) => {
  const [selectedCityId, setSelectedCityId] = useState('');
  const { data: cities, isLoading: isCitiesLoading } = useCities();
  const { data: lots } = useLots(selectedCityId);

  const handleCityChange = (event) => {
    setSelectedCityId(event.target.value);
  };

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

    console.log(data);
    
    try {
      await vehicle.add(formData.get('city'), formData.get('lot'), data);
      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  if (isCitiesLoading && !cities) {
    return null;
  }

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
        <DialogTitle>Naujas automobilis</DialogTitle>
        <DialogContent>
          <TextField label="Gamintojas" name="make" required />
          <TextField label="Modelis" name="model" required />
          <TextField name="dateOfManufacture" type="date" required />
          <FormControl>
            <InputLabel>Kuro tipas</InputLabel>
            <Select label="Kuro tipas" name="fuelType" defaultValue="" required>
              <MenuItem value="petrol">Benzinas</MenuItem>
              <MenuItem value="diesel">Dyzelinas</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Pavar?? d??????s tipas</InputLabel>
            <Select label="Pavar?? d??????s tipas" name="gearBox" defaultValue="" required>
              <MenuItem value="manual">Mechanin??</MenuItem>
              <MenuItem value="automatic">Automatin??</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Variklio t??ris" name="engineCapacity" type="number" required />
          <TextField label="Kaina" name="price" type="number" required />
          <FormControl>
            <InputLabel>Miestas</InputLabel>
            <Select label="Miestas" name="city" defaultValue="" onChange={handleCityChange} required>
              {cities.map((item) => (
                <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>  
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Aik??tel??</InputLabel>
            <Select label="Aik??tel??" name="lot" defaultValue="" required>
              {lots && lots.map((item) => (
                <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>  
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpen(false)}>At??aukti</Button>
          <Button variant="contained" type="submit">Prid??ti</Button>
        </DialogActions>
      </Dialog>
  )
}

export default NewAdDialog;