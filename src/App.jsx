import CustomButton from '@components/common/Button';
import GlobalFont from '@styles/GlobalFonts';
import GlobalStyle from '@styles/GlobalStyle';
import theme from '@styles/theme';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';

// 버튼 컴포넌트 테스트를 위한 버튼 컨테이너..
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* 버튼 간격 */
  align-items: flex-start;
  padding: 20px;
`;

function App() {
  const [isCTAActive, setIsCTAActive] = useState(false);
  const [isDeleteActive, setIsDeleteActive] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <GlobalFont />
      <GlobalStyle />
      <ButtonContainer>
        {/* CTA Abled → 클릭하면 CTA Active */}
        <CustomButton
          size="medium"
          type={isCTAActive ? 'CTA Active' : 'CTA Abled'}
          onClick={() => setIsCTAActive((prev) => !prev)}
        >
          CTA Abled 버튼 medium 사이즈 클릭해보세요
        </CustomButton>

        {/* CTA Delete → 클릭하면 CTA Delete Active */}
        <CustomButton
          size="large"
          type={isDeleteActive ? 'CTA Delete Active' : 'CTA Delete'}
          onClick={() => setIsDeleteActive((prev) => !prev)}
        >
          CTA Delete 버튼 large 사이즈 클릭해보세요
        </CustomButton>

        {/* 비활성화 버튼 (클릭 불가능) */}
        <CustomButton size="small" type="CTA Disabled">
          CTA Disabled 버튼 small 사이즈 클릭 불가능
        </CustomButton>

        {/* 기본 선 버튼 */}
        <CustomButton size="small" type="CTA Lined">
          CTA Lined 버튼 small 사이즈
        </CustomButton>
      </ButtonContainer>
    </ThemeProvider>
  );
}

export default App;
