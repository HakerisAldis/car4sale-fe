import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useCities } from '../../models/city/useCities';
import AddNewCity from './AddNewCity';
import EditCity from './EditCity';
import { queryClient } from '../../services/queryClient';
import { city } from '../../models/city/city';

const CityRow = ({ item }) => {
  const [openEdit, setOpenEdit] = useState(false);

  async function handleDelete (id) {
    try {
      await city.delete(id);
      await queryClient.refetchQueries(['cities']);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TableRow>
      <TableCell>{item.id}</TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell align="right">
        <Button variant="contained" color="primary" onClick={() => setOpenEdit(true)}>Redaguoti</Button>
      </TableCell>
      <TableCell align="right">
        <Button variant="contained" color="error" onClick={() => handleDelete(item.id)}>Ištrinti</Button>
      </TableCell>
      <EditCity open={openEdit} setOpen={setOpenEdit} item={item} />
    </TableRow>
  );
}

const Cities = () => {
  const { data, isLoading } = useCities();

  const [openAddNew, setOpenAddNew] = useState(false);

  if (isLoading) {
    return <div>Kraunasi...</div>;
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title>Miestai</Title>
        <Button variant="contained" color="primary" onClick={() => setOpenAddNew(true)}>Pridėti</Button>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Pavadinimas</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <CityRow key={row.id} item={row} />
          ))}
        </TableBody>
      </Table>
      <AddNewCity open={openAddNew} setOpen={setOpenAddNew} />
    </React.Fragment>
  );
}

export default Cities;