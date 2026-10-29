import React, { useEffect, useState } from 'react';
import { Alert, Box, Container, Link, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import Search from './components/search';
import WeatherCard from './components/WeatherCard';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE = 'https://api.weatherapi.com/v1/current.json';
const STORAGE_KEY = 'app_clima_recientes';

export default function App() {
  const { enqueueSnackbar } = useSnackbar();
  const [ciudad, setCiudad] = useState('');
  const [loading, setLoading] = useState(false);
  const [unidad, setUnidad] = useState('C');
  const [error, setError] = useState({
    error: false,
    mensaje: '',
  });
  const [historial, setHistorial] = useState(() => {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY);
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });

  const [clima, setClima] = useState({
    city: '',
    region: '',
    country: '',
    localtime: '',
    tempC: '',
    tempF: '',
    feelslikeC: '',
    feelslikeF: '',
    condition: '',
    icon: '',
    conditionText: '',
    humidity: '',
    windKph: '',
    visKm: '',
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(historial));
    } catch {
      // Ignorar si localStorage no está disponible
    }
  }, [historial]);

  const guardarEnHistorial = (nombreCiudad) => {
    setHistorial((prev) => {
      const filtrado = prev.filter(
        (item) => item.toLowerCase() !== nombreCiudad.toLowerCase()
      );
      return [nombreCiudad, ...filtrado].slice(0, 5);
    });
  };

  const buscarClima = async (query, guardarReciente = true) => {
    const termino = query.trim();
    if (!termino) {
      setError({
        error: true,
        mensaje: 'Este campo es obligatorio',
      });
      return;
    }

    if (!API_KEY) {
      enqueueSnackbar('Falta configurar la variable VITE_API_KEY en el archivo .env', {
        variant: 'warning',
      });
      return;
    }

    setLoading(true);
    setError({ error: false, mensaje: '' });

    try {
      const url = `${API_BASE}?key=${API_KEY}&lang=es&q=${encodeURIComponent(termino)}`;
      const respuesta = await fetch(url);
      const datos = await respuesta.json();

      if (!respuesta.ok || datos.error) {
        throw new Error(
          datos?.error?.code === 1006
            ? 'No se encontró la ciudad ingresada'
            : 'No se pudo obtener la información del clima'
        );
      }

      const iconoUrl = datos.current.condition.icon.startsWith('//')
        ? `https:${datos.current.condition.icon}`
        : datos.current.condition.icon;

      setClima({
        city: datos.location.name,
        region: datos.location.region,
        country: datos.location.country,
        localtime: datos.location.localtime,
        tempC: Math.round(datos.current.temp_c),
        tempF: Math.round(datos.current.temp_f),
        feelslikeC: Math.round(datos.current.feelslike_c),
        feelslikeF: Math.round(datos.current.feelslike_f),
        condition: datos.current.condition.code,
        icon: iconoUrl,
        conditionText: datos.current.condition.text,
        humidity: datos.current.humidity,
        windKph: Math.round(datos.current.wind_kph),
        visKm: datos.current.vis_km,
      });

      if (guardarReciente) {
        guardarEnHistorial(datos.location.name);
      }
    } catch (err) {
      setError({
        error: true,
        mensaje: err.message || 'Error al consultar el servicio',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    buscarClima(ciudad);
  };

  const handleLocate = () => {
    if (!navigator.geolocation) {
      enqueueSnackbar('Tu navegador no soporta geolocalización', {
        variant: 'error',
      });
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = `${pos.coords.latitude},${pos.coords.longitude}`;
        buscarClima(coords, true);
      },
      () => {
        setLoading(false);
        enqueueSnackbar('No se pudo obtener tu ubicación actual', {
          variant: 'error',
        });
      },
      { timeout: 10000 }
    );
  };

  const handleSelectHistorial = (item) => {
    setCiudad(item);
    buscarClima(item, true);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Paper elevation={1} sx={{ p: { xs: 2.5, sm: 4 } }}>
        <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
          Clima actual
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Consultá el estado del tiempo por ciudad o usando tu ubicación.
        </Typography>

        {!API_KEY && (
          <Alert severity="warning" sx={{ mb: 2.5 }}>
            No se detectó <code>VITE_API_KEY</code>. Creá un archivo{' '}
            <code>.env</code> en la raíz del proyecto con tu clave de WeatherAPI.
          </Alert>
        )}

        <Search
          ciudad={ciudad}
          setCiudad={setCiudad}
          onSubmit={handleSubmit}
          onLocate={handleLocate}
          loading={loading}
          error={error}
          historial={historial}
          onSelectHistorial={handleSelectHistorial}
          onClearHistorial={() => setHistorial([])}
        />

        <WeatherCard clima={clima} unidad={unidad} setUnidad={setUnidad} />

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Datos provistos por{' '}
            <Link
              href="https://www.weatherapi.com/"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
            >
              WeatherAPI.com
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
