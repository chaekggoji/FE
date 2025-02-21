import { createGlobalStyle } from 'styled-components';

const GlobalFont = createGlobalStyle`
@font-face {
  font-family: 'Ownglyph_StudyHard-Rg';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2411-3@1.0/Ownglyph_StudyHard-Rg.woff2')
    format('woff2');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'GowunBatang-Regular';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/GowunBatang-Regular.woff')
    format('woff');
  font-weight: normal;
  font-style: normal;
}
body{
  font-family: 'Ownglyph_StudyHard-Rg', 'GowunBatang-Regular', sans-serif;
}
`;
export default GlobalFont;
