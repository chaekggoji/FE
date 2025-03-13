import noProfile from '@assets/icons/icon_no_profile_24.svg';
import profileUpload from '@assets/icons/icon_profile_upload_50.svg';
import profileUpdate from '@assets/icons/icon_profile_update_50.svg';
import deleteProfile from '@assets/icons/icon_x_24.svg';
import Button from '@components/common/Button';
import InterestSelect from '@components/common/InterestSelect';
import { useState } from 'react';
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

  const [uploadImgUrl, setUploadImgUrl] = useState('');

  const onChangeImgUpload = (e) => {
    const { files } = e.target;
    const uploadFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onloadend = () => {
      setUploadImgUrl(reader.result);
    };
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
      <div className="relative w-[150px] h-[150px] mx-auto">
        {uploadImgUrl && (
          <button
            onClick={() => setUploadImgUrl('')}
            className="absolute top-0 right-0 translate-x-1/4 translate-y-[-1/4]"
          >
            <img src={deleteProfile} alt="프로필 이미지 초기화" />
          </button>
        )}

        {/* 프로필 이미지 */}
        <img
          src={uploadImgUrl || noProfile}
          alt={
            uploadImgUrl
              ? '유저가 업로드한 프로필 이미지'
              : '기본 프로필 이미지'
          }
          className="w-[150px] h-[150px] object-cover rounded-full"
        />
        <label
          htmlFor="profile-upload"
          className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 cursor-pointer"
        >
          <img
            src={uploadImgUrl ? profileUpdate : profileUpload}
            alt={
              uploadImgUrl ? '프로필 이미지 업데이트' : '프로필 이미지 업로드'
            }
          />
        </label>
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onChangeImgUpload}
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
            pattern: {
              value:
                /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
              message: '영문, 숫자, 특수문자 포함 8 ~ 20자로 입력해주세요',
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
              value === password || '비밀번호가 일치하지 않습니다.',
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
              value={field.value ?? []}
              onChange={(newValues) => field.onChange(newValues)}
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
