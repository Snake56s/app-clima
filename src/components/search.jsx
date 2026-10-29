import React from 'react';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  SvgIcon,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

function SearchIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </SvgIcon>
  );
}

function MyLocationIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
    </SvgIcon>
  );
}

function ClearIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </SvgIcon>
  );
}

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
