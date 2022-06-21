import { createTheme, PaletteColor } from '@mui/material';

const defaultTheme = createTheme();

const createColor = (color: string): PaletteColor => defaultTheme.palette.augmentColor({ color: { main: color } });

const pageTheme = createTheme({
  palette: {
    primary: createColor('#C1AC95'),
    secondary: createColor('#9EF5CF'),
    background: { default: '#FAEBE0' },
  },
  shape: {
    borderRadius: 5,
  },
  typography: {
    fontFamily: '\'Segoe UI\',\'Helvetica Neue\'',
  },
});

export default pageTheme;
