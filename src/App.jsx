import GlobalFont from '@styles/GlobalFonts';
import theme from '@styles/theme';
import { ThemeProvider } from 'styled-components';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalFont />
    </ThemeProvider>
  );
}

export default App;
