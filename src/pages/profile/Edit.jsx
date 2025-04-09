import noProfile from '@assets/icons/icon_no_profile_24.svg';
import profileUpload from '@assets/icons/icon_profile_upload_50.svg';
import Button from '@components/common/Button';
import InterestSelect from '@components/common/InterestSelect';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Edit = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [selectedInterestList, setSelectedInterestList] = useState([]);
  const [introduction, setIntroduction] = useState('');

  // 수정 페이지 유효성 검사 (필수: 닉네임, 관심분야 최소 1개)
  // TODO: 닉네임 중복 로직 추가 작성
  const isFormValid = nickname.trim() !== '' && selectedInterestList.length > 0;

  // 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid) {
      // TODO: 정보 수정 처리 로직 작성
      navigate('/profile/1');
    } else {
      alert('닉네임 입력과 관심분야 선택은 필수입니다.');
    }
  };

  // 회원 탈퇴 처리
  const handleDeleteAccount = (e) => {
    e.preventDefault();

    const confirmMessage =
      '탈퇴 시 모든 정보가 삭제되며 복구할 수 없습니다. 정말 탈퇴하시겠습니까?';

    if (window.confirm(confirmMessage)) {
      // TODO: 회원 탈퇴 로직 추가
      navigate('/');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[580px] mx-auto py-5 px-4 flex flex-col gap-5"
    >
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

      {/* 닉네임 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="nickname" className="text-gray-600">
          닉네임
        </label>
        <input
          id="nickname"
          type="text"
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full h-12 px-4 border border-gray-300 rounded-xl placeholder:text-gray-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-200 transition"
        />
      </div>

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

      {/* 자기소개 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="introduction" className="text-gray-600">
          자기소개
        </label>
        <textarea
          id="introduction"
          placeholder="간단한 소개글을 작성해주세요"
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl placeholder:text-gray-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-200 transition resize-none"
        />
      </div>

      {/* 버튼 */}
      <Button>내 정보 수정</Button>
      <Button type="CTA Lined" onClick={handleDeleteAccount}>
        회원 탈퇴
      </Button>
    </form>
  );
};

export default Edit;
