import {MD3LightTheme as DefaultTheme, useTheme} from 'react-native-paper';
import {MD2Colors} from 'react-native-paper/lib/typescript/src/types';

interface PointColor {
  point: {
    sageGreen: '#99A98C';
    olive: '#647445';
    mintGreen: '#BED5C5';
    taupe: '#B4AC9F';
    parePink: '#FBD1DD';
    dustBlue: '#A4B6C1';
  };
  gray: {
    50: '#F7F8F9';
    100: '#E8E8ED';
    200: '#C9CDD2';
    400: '#9EA4AA';
    500: '#72787F';
    600: '#454C53';
    800: '#26292B';
    900: '#1B1D1F';
  };
}

interface MyTheme {
  colors: Partial<MD2Colors> & PointColor;
  typography: {
    size: {
      H1: 90;
      H2: 54;
      H3: 36;
      H4: 28;
      H5: 24;
      H6: 20;
      body1: 16;
      body2: 15;
      body3: 14;
      body4: 13;
      body5: 12;
      body6: 11;
      body7: 10;
      body8: 9;
      body9: 8;
    };
    weight: {
      regular: '100';
      medium: '100';
      bold: '100';
      extraBold: '100';
    };
  };
}

const theme: MyTheme = {
  ...DefaultTheme,
  colors: {
    point: {
      sageGreen: '#99A98C',
      olive: '#647445',
      mintGreen: '#BED5C5',
      taupe: '#B4AC9F',
      parePink: '#FBD1DD',
      dustBlue: '#A4B6C1',
    },
    gray: {
      50: '#F7F8F9',
      100: '#E8E8ED',
      200: '#C9CDD2',
      400: '#9EA4AA',
      500: '#72787F',
      600: '#454C53',
      800: '#26292B',
      900: '#1B1D1F',
    },
  },
  typography: {
    size: {
      H1: 90,
      H2: 54,
      H3: 36,
      H4: 28,
      H5: 24,
      H6: 20,
      body1: 16,
      body2: 15,
      body3: 14,
      body4: 13,
      body5: 12,
      body6: 11,
      body7: 10,
      body8: 9,
      body9: 8,
    },
    weight: {
      regular: '100',
      medium: '100',
      bold: '100',
      extraBold: '100',
    },
  },
} as const;

export type AppTheme = typeof theme;

const useAppTheme = () => useTheme<AppTheme>();

export {theme, useAppTheme};
