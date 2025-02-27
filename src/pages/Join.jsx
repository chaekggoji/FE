import noProfile from '@assets/icons/icon_no_profile_24.svg';
import profileUpload from '@assets/icons/icon_profile_upload_50.svg';
import CustomButton from '@components/common/Button';
import styled from 'styled-components';

const JoinContainer = styled.div`
  width: 100%;
  max-width: 580px;
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const JoinTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.title['2xl']};
  text-align: center;
`;

const QuestionGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;
const QuestionText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.text.md};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginLink = styled.a`
  align-items: center;
  text-decoration: underline;
`;

const ProfileUploadContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto;
`;

const ProfileImage = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  align-items: center;
`;

const CameraIconWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LabelText = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.title.sm};
`;

const JoinInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 12px;
  font-size: ${({ theme }) => theme.fontSizes.text.md};
`;

const SelectInput = styled.select`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 12px;
  font-size: ${({ theme }) => theme.fontSizes.text.md};
  cursor: pointer;
`;

const Join = () => {
  return (
    <JoinContainer>
      <JoinTitle>회원가입</JoinTitle>
      <QuestionGroup>
        <QuestionText>계정이 이미 있으신가요?</QuestionText>
        <LoginLink href="#">로그인</LoginLink>
      </QuestionGroup>

      <ProfileUploadContainer>
        <ProfileImage>
          <img
            src={noProfile}
            alt="프로필 이미지"
            style={{ width: '100%', height: '100%' }}
          />
        </ProfileImage>
        <CameraIconWrapper>
          <img src={profileUpload} alt="이미지 업로드" />
        </CameraIconWrapper>
      </ProfileUploadContainer>

      <InputGroup>
        <LabelText>닉네임임</LabelText>
        <JoinInput type="text" placeholder="닉네임을 입력하세요" />
      </InputGroup>
      <InputGroup>
        <LabelText>이메일 주소</LabelText>
        <JoinInput type="email" placeholder="이메일 주소를 입력하세요" />
      </InputGroup>
      <InputGroup>
        <LabelText>비밀번호</LabelText>
        <JoinInput type="password" placeholder="비밀번호를 입력하세요" />
      </InputGroup>
      <InputGroup>
        <LabelText>비밀번호 확인</LabelText>
        <JoinInput type="password" placeholder="비밀번호를 다시 입력하세요" />
      </InputGroup>
      <p>필수 조건: 대소문자, 숫자, 특수문자 조합 8자 이상</p>

      <InputGroup>
        <LabelText>관심 분야 설정</LabelText>
        <SelectInput name="filter">
          <option value="" disabled selected>
            관심 분야를 선택하세요
          </option>
          <option value="one">관심분야 1</option>
          <option value="two">관심분야 2</option>
          <option value="three">관심분야 3</option>
          <option value="four">관심분야 4</option>
        </SelectInput>
      </InputGroup>
      <CustomButton size="large" type="CTA Disabled">
        회원가입
      </CustomButton>
    </JoinContainer>
  );
};

export default Join;
