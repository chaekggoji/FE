const colors = {
  white: '#FFFFFF',
  black: '#000000',
  primary: {
    100: '#DDEEDC',
    200: '#AFC8AD',
    300: '#8CA08A',
    400: '#6A7A69',
    500: '#4A5649',
    600: '#2D352C',
    700: '#121611',
  },
  secondary: {
    100: '#DDD7E4',
    200: '#B9ADC8',
    300: '#9784AC',
    400: '#745F8C',
    500: '#4F3F5F',
    600: '#2C2236',
    700: '#140E1A',
  },
  tertiary: {
    100: '#E5D9DF',
    200: '#C8ADBC',
    300: '#AD829B',
    400: '#845F75',
    500: '#5B4050',
    600: '#34232D',
    700: '#180E14',
  },
  gray: {
    100: '#F5F5F5',
    200: '#D9D9D9',
    300: '#C4C4C4',
    400: '#8E8E8E',
    500: '#5F5F5F',
  },
};

const breakpoints = {
  small: '@media (max-width: 375px)',
  medium: '@media (max-width: 768px)',
  large: '@media (min-width: 1440px)',
};

const theme = {
  colors,
  breakpoints,
};

export default theme;
