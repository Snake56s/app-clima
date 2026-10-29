import React from 'react';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ClearIcon from '@mui/icons-material/Clear';

export default function Search({
  ciudad,
  setCiudad,
  onSubmit,
  onLocate,
  loading,
  error,
  historial = [],
  onSelectHistorial,
  onClearHistorial,
}) {
  return (
    <Box>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={onSubmit}
        sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}
      >
        <TextField
          id="ciudad"
          variant="outlined"
          label="Ciudad o localidad"
          placeholder="Ej. Buenos Aires, Madrid, Lima..."
          size="small"
          fullWidth
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          error={error.error}
          helperText={error.mensaje}
          InputProps={{
            endAdornment: ciudad ? (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  aria-label="Limpiar búsqueda"
                  onClick={() => setCiudad('')}
                  edge="end"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />

        <Tooltip title="Usar mi ubicación">
          <span>
            <IconButton
              color="primary"
              aria-label="Usar mi ubicación"
              onClick={onLocate}
              disabled={loading}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                height: 40,
                width: 40,
              }}
            >
              <MyLocationIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>

        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          sx={{ height: 40, px: 2.5, whiteSpace: 'nowrap' }}
          startIcon={<SearchIcon />}
        >
          Buscar
        </LoadingButton>
      </Box>

      {historial.length > 0 && (
        <Box
          sx={{
            mt: 1.5,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0.75,
            alignItems: 'center',
          }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ mr: 0.5 }}>
            Recientes:
          </Typography>
          {historial.map((item) => (
            <Chip
              key={item}
              label={item}
              size="small"
              variant="outlined"
              onClick={() => onSelectHistorial(item)}
              disabled={loading}
            />
          ))}
          <Button
            size="small"
            color="inherit"
            onClick={onClearHistorial}
            disabled={loading}
            sx={{
              minWidth: 'auto',
              px: 1,
              py: 0.25,
              fontSize: '0.72rem',
              textTransform: 'none',
              color: 'text.secondary',
            }}
          >
            Limpiar
          </Button>
        </Box>
      )}
    </Box>
  );
}
