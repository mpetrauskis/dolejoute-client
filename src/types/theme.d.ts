import '@mui/material';

declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    navbar: CSSProperties;
    section: CSSProperties
  }
}

declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    blue?: PaletteColorOptions;
    red?: PaletteColorOptions;
    green?: PaletteColorOptions;
  }

  interface Palette {
    blue: PaletteColor;
    red: PaletteColor;
    green: PaletteColor;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    blue: true;
    red: true;
    green: true;
  }
}
