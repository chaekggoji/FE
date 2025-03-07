import Button from '@components/common/Button';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  return (
    <div className="w-full max-w-[580px] mx-auto p-5 flex flex-col gap-5">
      <h1 className="text-2xl text-center font-bold">로그인</h1>

      {/* 소셜 로그인 버튼 */}
      <div className="flex flex-col gap-4">
        {['구글', '카카오', '애플'].map((provider) => (
          <button
            key={provider}
            className="py-3 px-5 border border-gray-300 rounded-xl text-lg md:text-base transition duration-200 hover:bg-gray-200"
          >
            {provider} 로그인
          </button>
        ))}
      </div>

      {/* OR 구분선 */}
      <div className="flex items-center justify-center text-gray-500 my-4 text-lg">
        <span className="w-1/3 border-t border-gray-300"></span>
        <span className="mx-4">OR</span>
        <span className="w-1/3 border-t border-gray-300"></span>
      </div>

      {/* 이메일 입력 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600">이메일 주소</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-12 px-4 border border-gray-300 rounded-xl text-base focus:border-primary-400 focus:ring-2 focus:ring-primary-200 transition"
        />
      </div>

      {/* 비밀번호 입력 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600">비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-12 px-4 border border-gray-300 rounded-xl text-base focus:border-primary-400 focus:ring-2 focus:ring-primary-200 transition"
        />
      </div>

      {/* 비밀번호 찾기 */}
      <Link to="#" className="text-primary-400 text-right text-sm">
        비밀번호 찾기
      </Link>

      {/* 자동 로그인 체크박스 */}
      <div className="flex items-center gap-2 cursor-pointer text-base text-gray-700">
        <input id="auto-login" type="checkbox" />
        <label htmlFor="auto-login">자동 로그인</label>
      </div>

      {/* 로그인 버튼 */}
      <Button
        size="large"
        type={isFormValid ? 'CTA Active' : 'CTA Disabled'}
        disabled={!isFormValid}
        onClick={isFormValid ? () => navigate('/') : undefined}
      >
        로그인
      </Button>

      {/* 회원가입 유도 */}
      <div className="flex items-center justify-center text-gray-700 my-4">
        <span className="text-base">계정이 없으신가요?</span>
      </div>
      <Button size="large" type="CTA Lined" onClick={() => navigate('/signup')}>
        회원가입
      </Button>
    </div>
  );
};

export default Login;
