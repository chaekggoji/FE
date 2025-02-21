import logo from '@assets/logo.svg';
import theme from '@styles/theme';
import { ThemeProvider } from 'styled-components';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <img src={logo} alt="책꼬지 로고" />
    </ThemeProvider>
  );
}

export default App;
