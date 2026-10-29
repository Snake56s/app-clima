import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import AirIcon from '@mui/icons-material/Air';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

export default function WeatherCard({ clima, unidad, setUnidad }) {
  if (!clima.city) return null;

  const temp = unidad === 'C' ? `${clima.tempC} °C` : `${clima.tempF} °F`;
  const sensacion =
    unidad === 'C' ? `${clima.feelslikeC} °C` : `${clima.feelslikeF} °F`;

  return (
    <Card variant="outlined" sx={{ mt: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 1,
          }}
        >
          <Box>
            <Typography variant="h5" component="h2" fontWeight={600}>
              {clima.city}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {[clima.region, clima.country].filter(Boolean).join(', ')}
            </Typography>
            {clima.localtime && (
              <Typography variant="caption" color="text.secondary">
                Hora local: {clima.localtime}
              </Typography>
            )}
          </Box>

          <ToggleButtonGroup
            size="small"
            value={unidad}
            exclusive
            onChange={(_, val) => val && setUnidad(val)}
            aria-label="Unidad de temperatura"
          >
            <ToggleButton value="C" sx={{ px: 1.2, py: 0.3 }}>
              °C
            </ToggleButton>
            <ToggleButton value="F" sx={{ px: 1.2, py: 0.3 }}>
              °F
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            my: 2.5,
            gap: 2,
          }}
        >
          {clima.icon && (
            <Box
              component="img"
              alt={clima.conditionText}
              src={clima.icon}
              sx={{ width: 64, height: 64 }}
            />
          )}
          <Box>
            <Typography variant="h3" component="p" fontWeight={500}>
              {temp}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {clima.conditionText}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DeviceThermostatIcon fontSize="small" color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  Sensación térmica
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {sensacion}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <WaterDropOutlinedIcon fontSize="small" color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  Humedad
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {clima.humidity}%
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AirIcon fontSize="small" color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  Viento
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {clima.windKph} km/h
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <VisibilityOutlinedIcon fontSize="small" color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  Visibilidad
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {clima.visKm} km
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
