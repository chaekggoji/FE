import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* 기본 요소 초기화 */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* 문서 기본 스타일 */
  body {
    line-height: 1.5;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  }

  /* 링크 스타일 */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* 리스트 스타일 초기화 */
  ol, ul {
    list-style: none;
  }

  /* 기본적인 버튼 스타일 유지 */
  button, input, textarea, select {
    font: inherit;
    border: none;
    outline: none;
    background: none;
  }

  /* 헤딩 태그 유지 */
  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
  }

  /* 테이블 초기화 */
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

export default GlobalStyle;
