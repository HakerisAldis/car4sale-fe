import React from 'react';
import { Dialog, DialogTitle, DialogActions, DialogContent, TextField, Button } from '@mui/material';
import { city } from '../../models/city/city';
import { queryClient } from '../../services/queryClient';

const EditCity = ({ open, setOpen, item }) => {

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name'),
    };
    
    try {
      await city.update(item.id, data);
      await queryClient.refetchQueries(['cities']);
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
        <DialogTitle>Redaguoti miestą</DialogTitle>
        <DialogContent>
          <TextField label="Pavadinimas" name="name" defaultValue={item.name} required />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpen(false)}>Atšaukti</Button>
          <Button variant="contained" type="submit">Atnaujinti</Button>
        </DialogActions>
      </Dialog>
  )
}

export default EditCity;