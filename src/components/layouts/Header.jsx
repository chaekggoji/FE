import { Link } from 'react-router';
import logo from '@assets/logo.svg';
import alarm from '@assets/icons/icon_alarm_37.svg';
import noAlarm from '@assets/icons/icon_no_alarm_37.svg';
import noProfile from '@assets/icons/icon_no_profile_24.svg';
import { useState } from 'react';

const Header = () => {
  // 로그인 개발 전 useState로.. true면 로그인 상태, false면 로그아웃 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 알림 상태.. true면 알림 있음, false는 알림 없음..
  const [isAlarm, setIsAlarm] = useState(false);
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md text-2xl md:text-xl sm:text-lg">
      {/* 로고 섹션 */}
      <Link to="/" className="flex items-center gap-2 text-inherit">
        <img src={logo} alt="책꼬지 로고" className="w-12 md:w-10 sm:w-8" />
        <h1 className="m-0">책꼬지</h1>
      </Link>

      {/* 네비게이션 */}
      <nav className="flex items-center gap-5">
        {isLoggedIn ? (
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
          <>
            <Link to="/study/create" className="hidden sm:block">
              스터디 생성
            </Link>
            <Link to="/login">로그인</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
