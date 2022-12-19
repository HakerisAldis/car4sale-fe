import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Title from './Title';
import { useCities } from '../../models/city/useCities';
import { queryClient } from '../../services/queryClient';
import { useLots } from '../../models/lot/useLots';
import AddNewLot from './AddNewLot';
import { lot } from '../../models/lot/lot';
import EditLot from './EditLot';

const LotRow = ({ item }) => {
  const [openEdit, setOpenEdit] = useState(false);

  async function handleDelete (cityId, lotId) {
    try {
      await lot.delete(cityId, lotId);
      await queryClient.refetchQueries([`city-${cityId}-lots`]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TableRow>
      <TableCell>{item.id}</TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.city}</TableCell>
      <TableCell align="right">
        <Button variant="contained" color="primary" onClick={() => setOpenEdit(true)}>Redaguoti</Button>
      </TableCell>
      <TableCell align="right">
        <Button variant="contained" color="error" onClick={() => handleDelete(item.cityId, item.id)}>Ištrinti</Button>
      </TableCell>
      <EditLot open={openEdit} setOpen={setOpenEdit} item={item} />
    </TableRow>
  );
}

const Lots = () => {
  const [cityId, setCityId] = useState('');
  const { data } = useLots(cityId);
  const { data: cities, isLoading: isCitiesLoading } = useCities();

  const [openAddNew, setOpenAddNew] = useState(false);

  if (isCitiesLoading) {
    return <div>Kraunasi...</div>;
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title>Aikštelės</Title>
        <FormControl sx={{ width: '200px' }}>
          <InputLabel id="city-select-label">Miestas</InputLabel>
          <Select
            labelId="city-select-label"
            id="city-select"
            label="Miestas"
            value={cityId}
            onChange={(event) => setCityId(event.target.value)}
          >
            {cities.map((item) => (
              <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={() => setOpenAddNew(true)}>Pridėti</Button>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Pavadinimas</TableCell>
            <TableCell>Miestas</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row) => (
            <LotRow key={row.id} item={row} />
          ))}
        </TableBody>
      </Table>
      <AddNewLot open={openAddNew} setOpen={setOpenAddNew} />
    </React.Fragment>
  );
}

export default Lots;