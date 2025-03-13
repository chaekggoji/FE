import noProfile from '@assets/icons/icon_no_profile_24.svg';
import profileUpload from '@assets/icons/icon_profile_upload_50.svg';
import Button from '@components/common/Button';
import InterestSelect from '@components/common/InterestSelect';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange', // 입력할 때마다 유효성 검사 수행
  });

  const password = watch('password');

  const onSubmit = (data) => {
    console.log(data); // TODO : 회원가입 API 요청
    navigate('/login');
  };

  return (
    <form
      className="w-full max-w-[580px] mx-auto py-5 px-4 flex flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-center text-2xl">회원가입</h1>

      {/* 로그인 유도 */}
      <div className="flex items-center justify-center gap-2">
        <p>계정이 이미 있으신가요?</p>
        <Link to="/login" className="underline">
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
          className="absolute bottom-3 right-1 cursor-pointer"
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

      {/* 닉네임 */}
      <div className="flex flex-col gap-2">
        <label className="text-gray-600">닉네임</label>
        <input
          {...register('nickname', { required: '닉네임을 입력하세요' })}
          className="w-full h-12 px-4 border border-gray-300 rounded-xl placeholder:text-gray-400"
          placeholder="닉네임을 입력하세요"
        />
        {errors.nickname && (
          <p className="text-secondary-300 text-sm">
            {errors.nickname.message}
          </p>
        )}
      </div>

      {/* 이메일 */}
      <div className="flex flex-col gap-2">
        <label className="text-gray-600">이메일 주소</label>
        <input
          {...register('email', {
            required: '이메일을 입력하세요',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '유효한 이메일을 입력하세요',
            },
          })}
          className="w-full h-12 px-4 border border-gray-300 rounded-xl placeholder:text-gray-400"
          placeholder="이메일 주소를 입력하세요"
        />
        {errors.email && (
          <p className="text-secondary-300 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* 비밀번호 */}
      <div className="flex flex-col gap-2">
        <label className="text-gray-600">비밀번호</label>
        <input
          type="password"
          {...register('password', {
            required: '비밀번호를 입력하세요',
            minLength: {
              value: 8,
              message: '비밀번호는 최소 8자 이상이어야 합니다.',
            },
          })}
          className="w-full h-12 px-4 border border-gray-300 rounded-xl placeholder:text-gray-400"
          placeholder="비밀번호를 입력하세요"
        />
        {errors.password && (
          <p className="text-secondary-300 text-sm">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* 비밀번호 확인 */}
      <div className="flex flex-col gap-2">
        <label className="text-gray-600">비밀번호 확인</label>
        <input
          type="password"
          {...register('confirmPassword', {
            required: '비밀번호를 다시 입력하세요',
            validate: (value) =>
              value === password
                ? '비밀번호가 일치합니다.'
                : '비밀번호가 일치하지 않습니다.',
          })}
          className="w-full h-12 px-4 border border-gray-300 rounded-xl placeholder:text-gray-400"
          placeholder="비밀번호를 다시 입력하세요"
        />
        {errors.confirmPassword && (
          <p
            className={`text-sm ${errors.confirmPassword.message === '비밀번호가 일치합니다.' ? 'text-primary-300' : 'text-secondary-300'}`}
          >
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* 관심 분야 선택 */}
      <div className="flex flex-col gap-2">
        <label className="text-gray-600">
          관심 분야 설정 (최소 1개, 최대 3개)
        </label>
        <Controller
          name="interests"
          control={control}
          rules={{ required: '관심 분야를 선택하세요' }}
          render={({ field }) => (
            <InterestSelect
              value={field.value || []}
              onChange={field.onChange}
            />
          )}
        />

        {errors.interests && (
          <p className="text-secondary-300 text-sm">
            {errors.interests.message}
          </p>
        )}
      </div>

      {/* 회원가입 버튼 */}
      <Button size="large" type={isValid ? 'CTA Abled' : 'CTA Disabled'}>
        회원가입
      </Button>
    </form>
  );
};

export default SignUp;
