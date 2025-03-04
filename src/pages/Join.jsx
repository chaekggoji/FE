import noProfile from '@assets/icons/icon_no_profile_24.svg';
import profileUpload from '@assets/icons/icon_profile_upload_50.svg';
import CustomButton from '@components/common/Button';
import InterestSelect from '@components/common/InterestSelect';
import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router';

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

const LoginLink = styled(Link)`
  align-items: center;
  text-decoration: underline;
`;

const ProfileUploadContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 180px;
  height: 180px;
  margin: 20px auto;
`;

const ProfileImage = styled.div`
  width: 100%;
`;

const CameraIconWrapper = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 50px;
  cursor: pointer;
`;

// 파일 입력을 위한 숨겨진 input 추가
const HiddenFileInput = styled.input`
  display: none; // 시각적으로 숨김
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LabelText = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.title.sm};
  color: #666666;
`;

const JoinInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 12px;
  font-size: ${({ theme }) => theme.fontSizes.text.md};

  &::placeholder {
    color: rgba(102, 102, 102, 0.6);
    opacity: 1;
  }
`;

const PasswordRequirement = styled.p`
  color: #666666;
  font-size: ${({ theme }) => theme.fontSizes.text.sm};
`;

const Join = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedInterestList, setSelectedInterestList] = useState([]);

  const isFormValid =
    nickname.trim() !== '' &&
    email.trim() !== '' &&
    password.trim() !== '' &&
    confirmPassword.trim() !== '' &&
    selectedInterestList.length > 0;

  return (
    <JoinContainer as="form">
      <JoinTitle>회원가입</JoinTitle>
      <QuestionGroup>
        <QuestionText>계정이 이미 있으신가요?</QuestionText>
        <LoginLink to="/users/login">로그인</LoginLink>
      </QuestionGroup>

      <ProfileUploadContainer>
        <ProfileImage>
          <img
            src={noProfile}
            alt="프로필 이미지"
            style={{ width: '100%', height: '100%' }}
          />
        </ProfileImage>
        <label htmlFor="profile-upload">
          <CameraIconWrapper>
            <img src={profileUpload} alt="이미지 업로드" />
          </CameraIconWrapper>
        </label>
        <HiddenFileInput
          id="profile-upload"
          type="file"
          accept="image/*" // 이미지 파일만 선택 가능하도록
        />
      </ProfileUploadContainer>

      <InputGroup>
        <LabelText>닉네임</LabelText>
        <JoinInput
          type="text"
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </InputGroup>
      <InputGroup>
        <LabelText>이메일 주소</LabelText>
        <JoinInput
          type="email"
          placeholder="이메일 주소를 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputGroup>
      <InputGroup>
        <LabelText>비밀번호</LabelText>
        <JoinInput
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputGroup>
      <InputGroup>
        <LabelText>비밀번호 확인</LabelText>
        <JoinInput
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <PasswordRequirement>
          필수 조건: 대소문자, 숫자, 특수문자 조합 8자 이상
        </PasswordRequirement>
      </InputGroup>

      <InputGroup>
        <LabelText>관심 분야 설정</LabelText>
        <InterestSelect
          selectedInterestList={selectedInterestList}
          setSelectedInterestList={setSelectedInterestList}
        />
      </InputGroup>

      <CustomButton
        size="large"
        type={isFormValid ? 'CTA Active' : 'CTA Disabled'}
        disabled={!isFormValid}
      >
        {isFormValid ? <Link to="/users/login">회원가입</Link> : '회원가입'}
      </CustomButton>
    </JoinContainer>
  );
};

export default Join;
