import React from 'react'
import { Stack, Box, FormControl, InputLabel, Select, MenuItem, Container, Button } from '@mui/material';
import { useCities } from '../../models/city/useCities';
import { useLots } from '../../models/lot/useLots';
import CloseIcon from '@mui/icons-material/Close';

const Filter = ({ filters, setFilters }) => {
  const { data: cities, isLoading: isCitiesLoading } = useCities();
  const { data: lots } = useLots(filters.city);

  const handleCityChange = (event) => {
    setFilters({
      city: event.target.value,
      lot: '',
    });
  };

  const handleLotChange = (event) => {
    setFilters({
      ...filters,
      lot: event.target.value,
    });
  };

  if (isCitiesLoading && !cities) {
    return null;
  }

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <FormControl fullWidth>
              <InputLabel id="city-select-label">Miestas</InputLabel>
              <Select
                labelId="city-select-label"
                id="city-select"
                label="Miestas"
                value={filters.city}
                onChange={handleCityChange}
              >
                {cities.map((item) => (
                  <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="lot-select-label">Aikštelė</InputLabel>
              <Select
                labelId="lot-select-label"
                id="lot-select"
                label="Aikštelė"
                value={filters.lot}
                onChange={handleLotChange}
              >
                {lots && lots.map((item) => (
                  <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" onClick={() => setFilters({city: '', lot: ''})}>
              <CloseIcon fontSize="medium" />
            </Button>
          </Stack>
      </Container>
    </Box>
  )
}

export default Filter;