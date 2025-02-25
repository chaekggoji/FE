const theme = {
  colors: {
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
  },
  fontSizes: {
    title: {
      '2xs': '0.75rem', // 12px
      xs: '0.875rem', // 14px
      sm: '1rem', // 16px
      md: '1.125rem', // 18px
      lg: '1.3125rem', // 21px
      xl: '1.5rem', // 24px
      '2xl': '2.25rem', // 36px
      '3xl': '3rem', // 48px
      '4xl': '3.75rem', // 60px
      '5xl': '4.5rem', // 72px
    },
    text: {
      '2xs': '0.625rem', // 10px
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      md: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.375rem', // 22px
      '3xl': '1.5rem', // 24px
      '4xl': '1.625rem', // 26px
      '5xl': '1.75rem', // 28px
    },
  },
  breakpoints: {
    small: '@media (max-width: 375px)',
    medium: '@media (max-width: 768px)',
    large: '@media (min-width: 1440px)',
  },
};

export default theme;
