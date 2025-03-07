import noProfile from '@assets/icons/icon_no_profile_24.svg';
import profileUpload from '@assets/icons/icon_profile_upload_50.svg';
import Button from '@components/common/Button';
import InterestSelect from '@components/common/InterestSelect';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

const SignUp = () => {
  const navigate = useNavigate();

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
    <form className="w-full max-w-[580px] mx-auto py-5 px-4 flex flex-col gap-5">
      <h1 className="text-center text-2xl font-bold">회원가입</h1>

      {/* 로그인 유도 */}
      <div className="flex items-center justify-center gap-2">
        <p className="text-gray-600">계정이 이미 있으신가요?</p>
        <Link to="/login" className="text-primary-400 font-semibold">
          로그인
        </Link>
      </div>

      {/* 프로필 이미지 업로드 */}
      <div className="relative w-44 h-44 mx-auto">
        <img
          src={noProfile}
          alt="프로필 이미지"
          className="w-full h-full object-cover rounded-full"
        />
        <label
          htmlFor="profile-upload"
          className="absolute bottom-1 right-1 cursor-pointer"
        >
          <img src={profileUpload} alt="이미지 업로드" className="w-12 h-12" />
        </label>
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          className="hidden"
        />
      </div>

      {/* 입력 필드 */}
      {[
        {
          label: '닉네임',
          type: 'text',
          value: nickname,
          setter: setNickname,
          placeholder: '닉네임을 입력하세요',
        },
        {
          label: '이메일 주소',
          type: 'email',
          value: email,
          setter: setEmail,
          placeholder: '이메일 주소를 입력하세요',
        },
        {
          label: '비밀번호',
          type: 'password',
          value: password,
          setter: setPassword,
          placeholder: '비밀번호를 입력하세요',
        },
        {
          label: '비밀번호 확인',
          type: 'password',
          value: confirmPassword,
          setter: setConfirmPassword,
          placeholder: '비밀번호를 다시 입력하세요',
        },
      ].map(({ label, type, value, setter, placeholder }, index) => (
        <div key={index} className="flex flex-col gap-2">
          <label className="text-gray-600">{label}</label>
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setter(e.target.value)}
            className="w-full h-12 px-4 border border-gray-300 rounded-xl placeholder:text-gray-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-200 transition"
          />
          {label === '비밀번호 확인' && (
            <p className="text-gray-500 text-sm">
              필수 조건: 대소문자, 숫자, 특수문자 조합 8자 이상
            </p>
          )}
        </div>
      ))}

      {/* 관심 분야 선택 */}
      <div className="flex flex-col gap-2">
        <label className="text-gray-600">
          관심 분야 설정 (최소 1개, 최대 3개)
        </label>
        <InterestSelect
          selectedInterestList={selectedInterestList}
          setSelectedInterestList={setSelectedInterestList}
        />
      </div>

      {/* 회원가입 버튼 */}
      <Button
        size="large"
        type={isFormValid ? 'CTA Active' : 'CTA Disabled'}
        disabled={!isFormValid}
        onClick={isFormValid ? () => navigate('/login') : undefined}
      >
        회원가입
      </Button>
    </form>
  );
};

export default SignUp;
