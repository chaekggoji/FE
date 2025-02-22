import GlobalFont from '@styles/GlobalFonts';
import GlobalStyle from '@styles/GlobalStyle';
import theme from '@styles/theme';
import { ThemeProvider } from 'styled-components';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalFont />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
