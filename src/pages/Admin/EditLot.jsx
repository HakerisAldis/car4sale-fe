import React from 'react';
import { Dialog, DialogTitle, DialogActions, DialogContent, TextField, Button } from '@mui/material';
import { queryClient } from '../../services/queryClient';
import { lot } from '../../models/lot/lot';

const EditLot = ({ open, setOpen, item }) => {
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

    console.log(data);
    
    try {
      await lot.update(item.cityId, item.id, data);
      await queryClient.refetchQueries([`city-${item.cityId}-lots`]);
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
          '& .MuiFormControl-root': { m: 1, width: 380},
        }}
        maxWidth={'xs'}
        component="form"
        onSubmit={handleSubmit}
      >
        <DialogTitle>Redaguoti aikštelę</DialogTitle>
        <DialogContent>
          <TextField label="Pavadinimas" name="name" defaultValue={item.name} required />
          <TextField label="Adresas" name="address" defaultValue={item.address} required />
          <TextField label="Telefono numeris" name="phone" defaultValue={item.phone} required />
          <TextField label="Autombiliu skaicius" name="maxNumberOfCars" type="number" defaultValue={item.maxNumberOfCars} required />
          <TextField label="El. paštas" name="email" defaultValue={item.email} required />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpen(false)}>Atšaukti</Button>
          <Button variant="contained" type="submit">Atnaujinti</Button>
        </DialogActions>
      </Dialog>
  )
}

export default EditLot;