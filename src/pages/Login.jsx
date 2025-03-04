import CustomButton from '@components/common/Button';
import { useState } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

const LoginContainer = styled.div`
  width: 100%;
  max-width: 580px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LoginTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.title['2xl']};
  text-align: center;
`;

const SocialLoginGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SocialLoginBtn = styled.button`
  border: 1px solid black;
  border-radius: 12px;
  cursor: pointer;
  padding: 15px 0;
  font-size: ${({ theme }) => theme.fontSizes.title.md};
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 32px 0;

  font-size: ${({ theme }) => theme.fontSizes.text.xl};

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  }

  &::before {
    margin-right: 1em;
  }

  &::after {
    margin-left: 1em;
  }
`;

const LabelText = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.title.sm};
  color: #666666;
`;

const LoginInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 12px;
  font-size: ${({ theme }) => theme.fontSizes.text.md};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AutoLoginWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.title.md};
  color: #333333;
`;

const FindPasswordLink = styled(Link)`
  text-decoration: underline;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
`;

const QuestionText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.text['3xl']};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HR = styled.hr`
  background: rgba(102, 102, 102, 0.25);
  height: 2px;
  border: 0px;
`;

// 링크를 버튼 전체에 적용하기 위한 스타일 수정
const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  width: 100%; // 전체 너비를 사용하도록 설정
`;

// 버튼 크기 유지를 위한 추가 스타일
const ButtonWrapper = styled.div`
  width: 100%;

  & > a {
    width: 100%;
    display: block;
  }

  & button {
    width: 100%;
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginButtonActive, setIsLoginButtonActive] = useState(false);

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };

  const handleLoginClick = () => {
    setIsLoginButtonActive((prev) => !prev);
  };

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  return (
    <LoginContainer>
      <LoginTitle>로그인</LoginTitle>
      <SocialLoginGroup>
        <SocialLoginBtn>구글 로그인</SocialLoginBtn>
        <SocialLoginBtn>카카오 로그인</SocialLoginBtn>
        <SocialLoginBtn>애플 로그인</SocialLoginBtn>
      </SocialLoginGroup>
      <OrDivider>OR</OrDivider>
      <InputGroup>
        <LabelText>이메일 주소</LabelText>
        <LoginInput
          type="email"
          value={email}
          onChange={(e) => handleInputChange(e, setEmail)}
        />
      </InputGroup>
      <InputGroup>
        <LabelText>비밀번호</LabelText>
        <LoginInput
          type="password"
          value={password}
          onChange={(e) => handleInputChange(e, setPassword)}
        />
      </InputGroup>
      <FindPasswordLink to="#">비밀번호 찾기</FindPasswordLink>
      <AutoLoginWrapper>
        <input type="checkbox" />
        자동 로그인
      </AutoLoginWrapper>

      <ButtonWrapper>
        {isFormValid ? (
          <StyledLink to="/">
            <CustomButton size="large" type="CTA Active">
              로그인
            </CustomButton>
          </StyledLink>
        ) : (
          <CustomButton size="large" type="CTA Disabled" disabled>
            로그인
          </CustomButton>
        )}
      </ButtonWrapper>

      <HR />
      <QuestionText>계정이 없으신가요?</QuestionText>

      <ButtonWrapper>
        <StyledLink to="/users/join">
          <CustomButton size="large" type="CTA Lined">
            회원가입
          </CustomButton>
        </StyledLink>
      </ButtonWrapper>
    </LoginContainer>
  );
};

export default Login;
