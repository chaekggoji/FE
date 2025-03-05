import noProfile from '@assets/icons/icon_no_profile_24.svg';
import profileUpload from '@assets/icons/icon_profile_upload_50.svg';
import CustomButton from '@components/common/Button';
import InterestSelect from '@components/common/InterestSelect';
import styled from 'styled-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

const SignUpContainer = styled.div`
  width: 100%;
  max-width: 580px;
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SignUpTitle = styled.h1`
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

const SignUpInput = styled.input`
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

const ErrorMessage = styled.p`
  color: red;
  font-size: ${({ theme }) => theme.fontSizes.text.sm};
`;

const PasswordConfirm = styled.p`
  color: green;
  font-size: ${({ theme }) => theme.fontSizes.text.sm};
`;
const SignUp = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);

  const [selectedInterestList, setSelectedInterestList] = useState([]);

  // 비밀번호 유효성 검사 함수
  const checkPasswordValid = (password) => {
    // 비밀번호가 비어있으면 검사하지 않음
    if (!password) {
      setPasswordValid(true); // 기본값을 true로 설정
      return true;
    }

    // 최소 8자, 대문자, 소문자, 숫자, 특수문자 포함 검사
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

    const isValid = regex.test(password);

    setPasswordValid(isValid);

    console.log('비밀번호 유효성:', isValid ? '유효함' : '유효하지 않음');

    return isValid;
  };

  // 비밀번호 일치 여부 확인 함수
  const checkPasswordMatch = (pass, confirmPass) => {
    // 비밀번호 확인이 비어있지 않고, 비밀번호가 입력된 경우에만 검사
    if (confirmPass !== '' && pass !== '') {
      if (pass === confirmPass) {
        setPasswordMatch(true);
        setPasswordError(false);
        console.log('비밀번호 일치');
      } else {
        setPasswordMatch(false);
        setPasswordError(true);
        console.log('비밀번호 불일치');
      }
    } else {
      // 비밀번호 확인 비어있는 경우 메시지 표시하지 않음
      setPasswordMatch(false);
      setPasswordError(false);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // 비밀번호 유효성 검사
    checkPasswordValid(newPassword);

    // 비밀번호 일치 여부 검사
    checkPasswordMatch(newPassword, confirmPassword);
    console.log('비밀번호 입력: ', newPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    checkPasswordMatch(password, newConfirmPassword);
    console.log('비밀번호 확인 입력: ', newConfirmPassword);
  };

  const isFormValid =
    nickname.trim() !== '' &&
    email.trim() !== '' &&
    password.trim() !== '' &&
    confirmPassword.trim() !== '' &&
    !passwordError &&
    passwordValid &&
    selectedInterestList.length > 0;

  return (
    <SignUpContainer as="form">
      <SignUpTitle>회원가입</SignUpTitle>
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
        <SignUpInput
          type="text"
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </InputGroup>
      <InputGroup>
        <LabelText>이메일 주소</LabelText>
        <SignUpInput
          type="email"
          placeholder="이메일 주소를 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputGroup>
      <InputGroup>
        <LabelText>비밀번호</LabelText>
        <SignUpInput
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={handlePasswordChange}
        />
        {password && !passwordValid && (
          <ErrorMessage>
            비밀번호는 대소문자, 숫자, 특수문자를 포함하여 8자 이상이어야
            합니다.
          </ErrorMessage>
        )}
      </InputGroup>
      <InputGroup>
        <LabelText>비밀번호 확인</LabelText>
        <SignUpInput
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {confirmPassword &&
          (passwordError ? (
            <ErrorMessage>비밀번호가 일치하지 않습니다</ErrorMessage>
          ) : (
            passwordMatch && (
              <PasswordConfirm>비밀번호가 일치합니다.</PasswordConfirm>
            )
          ))}
        <PasswordRequirement>
          필수 조건: 대소문자, 숫자, 특수문자 조합 8자 이상
        </PasswordRequirement>
      </InputGroup>

      <InputGroup>
        <LabelText>관심 분야 설정 (최소 1개, 최대 3개)</LabelText>
        <InterestSelect
          selectedInterestList={selectedInterestList}
          setSelectedInterestList={setSelectedInterestList}
        />
      </InputGroup>

      <CustomButton
        size="large"
        type={isFormValid ? 'CTA Active' : 'CTA Disabled'}
        disabled={!isFormValid}
        onClick={() => isFormValid && navigate('/users/login')}
      >
        회원가입
      </CustomButton>
    </SignUpContainer>
  );
};

export default SignUp;
