// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Tema oscuro personalizado para Material UI (MUI).
// Define paleta de colores, tipografía y overrides de componentes para
// lograr un estilo coherente en toda la aplicación.

import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',

    background: {
      default: 'hsl(220, 35%, 3%)',
      paper: 'hsl(220, 35%, 3%)',
    },

    primary: {
      main: '#4dabf7',
      light: '#74c0fc',
      dark: '#1c7ed6',
      contrastText: '#000',
    },

    text: {
      primary: '#ffffff',
      secondary: 'rgba(255,255,255,0.7)',
    }
  },

  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
  },

  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: 'hsl(220, 35%, 3%)',
          borderRadius: '8px',
        }
      }
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
        }
      }
    },
  },
});
