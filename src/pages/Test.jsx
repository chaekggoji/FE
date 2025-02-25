import CustomButton from '@components/common/Button';
import { useState } from 'react';
import styled from 'styled-components';
import heart from '@assets/icons/icon_heart_24.svg';
import heartFilled from '@assets/icons/icon_heart_filled_24.svg';

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
`;

const IconContainer = styled.div`
  margin-top: 20px;
`;
const Test = () => {
  const [isCTAActive, setIsCTAActive] = useState(false);
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  return (
    <div>
      <h1>Outlet 영역 테스트</h1>
      <p>푸터는 항상 브라우저 하단에 고정 됩니다</p>
      {/* 버튼 컴포넌트 적용이 잘 되는지 테스트 */}
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

      {/* 아이콘이 잘 나오는지 테스트 */}
      <IconContainer>
        <img src={heart} alt="빈 하트 버튼" />
        <img src={heartFilled} alt="꽉찬 하트 버튼" />
      </IconContainer>
    </div>
  );
};

export default Test;
