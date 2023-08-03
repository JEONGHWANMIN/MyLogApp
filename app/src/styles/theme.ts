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
    error: '#FF4C4C';
    warning: '#FFC107';
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
      H1: 42;
      H2: 36;
      H3: 28;
      H4: 24;
      H5: 20;
      H6: 18;
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
      regular: '200';
      medium: '400';
      bold: '700';
      extraBold: '900';
    };
    family: {
      regular: 'Pretendard-Regular';
      medium: 'Pretendard-Medium';
      semiBold: 'Pretendard-SemiBold';
      bold: 'Pretendard-Bold';
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
      error: '#FF4C4C',
      warning: '#FFC107',
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
      H1: 42,
      H2: 36,
      H3: 28,
      H4: 24,
      H5: 20,
      H6: 18,
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
      regular: '200',
      medium: '400',
      bold: '700',
      extraBold: '900',
    },
    family: {
      regular: 'Pretendard-Regular',
      medium: 'Pretendard-Medium',
      bold: 'Pretendard-Bold',
      semiBold: 'Pretendard-SemiBold',
    },
  },
} as const;

export type AppTheme = typeof theme;

const useAppTheme = () => useTheme<AppTheme>();

export {theme, useAppTheme};
