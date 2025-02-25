import router from '@routes/routes';
import GlobalFont from '@styles/GlobalFonts';
import GlobalStyle from '@styles/GlobalStyle';
import theme from '@styles/theme';
import { RouterProvider } from 'react-router';
import { ThemeProvider } from 'styled-components';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalFont />
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
