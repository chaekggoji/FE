import { Link, useNavigate } from 'react-router';
import logo from '@assets/logo.svg';
import alarm from '@assets/icons/icon_alarm_37.svg';
import noAlarm from '@assets/icons/icon_no_alarm_37.svg';
import noProfile from '@assets/icons/icon_profile_default_36.svg';
import { useState } from 'react';
import useUserStore from '@store/userStore';
import supabase from '@libs/supabase';

const Header = () => {
  const { user, resetUser } = useUserStore(); // Zustand 상태
  const [isAlarm, setIsAlarm] = useState(false); // 알림은 임시 상태
  const navigate = useNavigate();

  // 로그아웃
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert('로그아웃 실패: ' + error.message);
      return;
    }
    resetUser(); // Zustand 상태 초기화
    alert('로그아웃 되었습니다!');
    navigate('/login'); // 로그인 페이지로 이동
  };
  return (
    <header className="flex items-center justify-between h-[74px] px-6 py-4 shadow-md text-2xl md:text-xl sm:text-lg z-10">
      {/* 로고 섹션 */}
      <Link to="/" className="flex items-center gap-2 text-inherit">
        <img src={logo} alt="책꼬지 로고" className="w-12 md:w-10 sm:w-8" />
        <h1 className="m-0">책꼬지</h1>
      </Link>

      {/* 로그인 여부에 따른 네비게이션 */}
      <nav className="flex items-center gap-5">
        {user ? (
          <>
            <Link to="#" className="hidden sm:block">
              스터디 생성
            </Link>
            {/* 알림 */}
            <img
              src={isAlarm ? alarm : noAlarm}
              alt={isAlarm ? '알림 있음' : '알림 없음'}
              className="w-9 md:w-8 sm:w-7"
            />
            {/* 프로필 이미지 */}
            <img
              src={noProfile}
              alt="유저이미지"
              className="w-12 md:w-10 sm:w-8"
            />
            {/* 로그아웃 버튼(테스트를 위해 임시로) */}
            <button
              onClick={handleLogout}
              className="text-base text-gray-600 border border-gray-300 rounded-lg px-3 py-1 hover:bg-gray-100"
            >
              로그아웃
            </button>
          </>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
