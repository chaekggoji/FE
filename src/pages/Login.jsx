import CustomButton from '@components/common/Button';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
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
const Login = () => {
  const navigate = useNavigate();

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
      <CustomButton
        size="large"
        type={isFormValid ? 'CTA Active' : 'CTA Disabled'}
        onClick={() => isFormValid && navigate('/')}
      >
        로그인
      </CustomButton>

      <HR />
      <QuestionText>계정이 없으신가요?</QuestionText>
      <CustomButton size="large" type="CTA Lined">
        <Link to="/users/join">회원가입</Link>
      </CustomButton>
    </LoginContainer>
  );
};

export default Login;
