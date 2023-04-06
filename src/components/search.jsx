import { LoadingButton } from '@mui/lab';
import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';

export default function Search(consultaApi) {
  const [ciudad, setCiudad] = useState('');
  const [estado_btn, setEstado] = useState(false);
  const [error, setError] = useState({
    error: false,
    mensaje: '',
  });
  return (
    <Box
      sx={{ display: 'grid', gap: 2 }}
      component="form"
      autoComplete="off"
      onSubmit={consultaApi}
    >
      <TextField
        id="ciudad"
        variant="outlined"
        label="Ciudad"
        size="small"
        required
        value={ciudad}
        onChange={(e) => setCiudad(e.target.value)}
        error={error.error}
        helperText={error.mensaje}
      />
      <LoadingButton
        type="submit"
        variant="contained"
        loading={estado_btn}
        loadingIndicator="Buscando"
      >
        Buscar
      </LoadingButton>
    </Box>
  );
}
