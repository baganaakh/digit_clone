import { responsiveFontSizes } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import shadows from './shadows';
import palette from './palette';

const getTheme = (mode, paletteType) =>
  responsiveFontSizes(
    createTheme({
      palette: palette(mode, paletteType),
      layout: {
        contentWidth: 1236,
      },
      shadows: shadows(mode),
      typography: {
        fontFamily: '"Inter", sans-serif',
        button: {
          textTransform: 'none',
          fontWeight: 'medium',
        },
      },
      zIndex: {
        appBar: 1200,
        drawer: 1100,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            label: {
              fontWeight: 600,
            },
            containedSecondary: mode === 'light' ? { color: 'alternate.main' } : {},
          },
        },
      },
    }),
  );

export default getTheme;
