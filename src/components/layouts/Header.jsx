import { Link } from 'react-router';
import logo from '@assets/logo.svg';
import alarm from '@assets/icons/icon_alarm_37.svg';
import noAlarm from '@assets/icons/icon_no_alarm_37.svg';
import noProfile from '@assets/icons/icon_profile_default_36.svg';
import { useState } from 'react';
import useUserStore from '@store/userStore';

const Header = () => {
  const { user } = useUserStore(); // 현재 로그인 상태

  const [isAlarm, setIsAlarm] = useState(false); // 알림은 임시 상태
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
            <img
              src={isAlarm ? alarm : noAlarm}
              alt={isAlarm ? '알림 있음' : '알림 없음'}
              className="w-9 md:w-8 sm:w-7"
            />
            <img
              src={noProfile}
              alt="유저이미지"
              className="w-12 md:w-10 sm:w-8"
            />
          </>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
