import Button from '@components/common/Button';
import supabase from '@libs/supabase';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      console.log('로그인 성공');
      alert('로그인 성공');
      navigate('/'); // 성공 시에만 이동
    } catch (error) {
      console.error('로그인 에러:', error);
      setError(error.message || '로그인 중 오류가 발생했습니다.');
      alert('로그인 실패');
      // 실패 시 이동하지 않음
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="w-full max-w-[580px] mx-auto p-5 flex flex-col gap-5"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl text-center">로그인</h1>

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
          className="w-full h-12 px-4 border border-gray-300 rounded-xl text-base transition"
        />
      </div>

      {/* 비밀번호 입력 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600">비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-12 px-4 border border-gray-300 rounded-xl text-base transition"
        />
      </div>

      {/* 비밀번호 찾기 */}
      <Link to="#" className="text-right text-sm">
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
    </form>
  );
};

export default Login;
