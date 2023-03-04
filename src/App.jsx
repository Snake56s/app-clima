import { LoadingButton } from '@mui/lab';
import { TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useState } from 'react';
const API_QUERY = `http://api.weatherapi.com/v1/current.json?key=${
  import.meta.env.VITE_API_KEY
}&lang=es&q=`;
export default function App() {
  const [ciudad, setCiudad] = useState('');
  const [estado_btn, setEstado] = useState(false);
  const [error, setError] = useState({
    error: false,
    mensaje: '',
  });

  const [clima, setClima] = useState({
    city: '',
    country: '',
    temp: '',
    condition: '',
    icon: '',
    conditionText: '',
  });

  const consultaApi = async (e) => {
    e.preventDefault();
    setEstado(true);
    setError({
      error: false,
      mensaje: '',
    });
    try {
      if (!ciudad.trim()) throw { mensaje: 'Este campo es obligatiorio' };
      const respuesta = await fetch(`${API_QUERY}${ciudad}`);
      const datos = await respuesta.json();
      if (datos.error) throw { mensaje: 'No se a encontrado ciudad' };
      setClima({
        city: datos.location.name,
        country: datos.location.country,
        temp: datos.current.temp_c,
        condition: datos.current.condition.code,
        icon: datos.current.condition.icon,
        conditionText: datos.current.condition.text,
      });
    } catch (error) {
      setError({
        error: true,
        mensaje: error.mensaje,
      });
    } finally {
      setEstado(false);
    }
  };
  return (
    <Container maxWidth="xs" sx={{ mt: 2 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Aplicación de clima
      </Typography>
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
      {clima.city && (
        <Box sx={{ mt: 2, display: 'grid', gap: 2, textAlign: 'center' }}>
          <Typography variant="h4" component="h2">
            {clima.city}, {clima.country}
          </Typography>
          <Box
            component="img"
            alt={clima.conditionText}
            src={clima.icon}
            sx={{ margin: '0 auto' }}
          />
          <Typography variant="h5" component="h3">
            {clima.temp} °C
          </Typography>
          <Typography variant="h6" component="h4">
            {clima.conditionText}
          </Typography>
        </Box>
      )}
      <Typography textAlign="center" sx={{ mt: 2, fontSize: '11px' }}>
        Powered by{' '}
        <a href="https://www.weatherapi.com/" title="Free Weather API">
          WeatherAPI.com
        </a>
      </Typography>
    </Container>
  );
}
