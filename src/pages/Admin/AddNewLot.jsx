import React from 'react';
import { Dialog, DialogTitle, DialogActions, DialogContent, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { queryClient } from '../../services/queryClient';
import { useCities } from '../../models/city/useCities';
import { lot } from '../../models/lot/lot';

const AddNewLot = ({ open, setOpen }) => {
  const { data: cities, isLoading: isCitiesLoading } = useCities();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name'),
      address: formData.get('address'),
      phone: formData.get('phone'),
      maxNumberOfCars: formData.get('maxNumberOfCars'),
      email: formData.get('email'),
    };
    
    try {
      await lot.add(formData.get('city'), data);
      await queryClient.refetchQueries([`city-${formData.get('city')}-lots`]);
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
          '& .MuiFormControl-root': { m: 1, width: 380},
        }}
        maxWidth={'xs'}
        component="form"
        onSubmit={handleSubmit}
      >
        <DialogTitle>Nauja aikštelė</DialogTitle>
        <DialogContent>
          <TextField label="Pavadinimas" name="name" required />
          <TextField label="Adresas" name="address" required />
          <TextField label="Telefono numeris" name="phone" required />
          <TextField label="Autombiliu skaicius" name="maxNumberOfCars" type="number" required />
          <TextField label="El. paštas" name="email" required />
          <FormControl>
            <InputLabel>Miestas</InputLabel>
            <Select label="Miestas" name="city" defaultValue="" required>
              {cities.map((item) => (
                <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>  
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpen(false)}>Atšaukti</Button>
          <Button variant="contained" type="submit">Pridėti</Button>
        </DialogActions>
      </Dialog>
  )
}

export default AddNewLot;