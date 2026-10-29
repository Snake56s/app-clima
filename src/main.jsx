import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { SnackbarProvider } from 'notistack';

const theme = createTheme({
  palette: {
    background: {
      default: '#f4f6f8',
    },
    primary: {
      main: '#1976d2',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={3500}
      >
        <CssBaseline />
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
