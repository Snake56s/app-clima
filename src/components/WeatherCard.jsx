import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  SvgIcon,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';

function WaterDropOutlinedIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 18c-3.35 0-6-2.57-6-6.2 0-2.34 1.95-5.44 6-9.14 4.05 3.7 6 6.79 6 9.14 0 3.63-2.65 6.2-6 6.2zm-4.17-6c.37 0 .67.26.74.62.41 2.22 2.28 2.98 3.64 2.87.43-.02.79.32.79.75 0 .4-.32.73-.72.75-2.13.13-4.62-1.09-5.19-4.12-.08-.45.28-.87.74-.87z" />
    </SvgIcon>
  );
}

function AirIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M14.5 17c0 1.65-1.35 3-3 3s-3-1.35-3-3h2c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1H2v-2h9.5c1.65 0 3 1.35 3 3zM19 6.5C19 4.57 17.43 3 15.5 3S12 4.57 12 6.5h2c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S16.33 8 15.5 8H2v2h13.5c1.93 0 3.5-1.57 3.5-3.5zm-.5 4.5H2v2h16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5v2c1.93 0 3.5-1.57 3.5-3.5S20.43 11 18.5 11z" />
    </SvgIcon>
  );
}

function DeviceThermostatIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M15 13V5c0-1.66-1.34-3-3-3S9 3.34 9 5v8c-1.21.91-2 2.37-2 4 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.09-2-4zm-4-8c0-.55.45-1 1-1s1 .45 1 1h-1v1h1v2h-1v1h1v2h-2V5z" />
    </SvgIcon>
  );
}

function VisibilityOutlinedIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z" />
    </SvgIcon>
  );
}

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
