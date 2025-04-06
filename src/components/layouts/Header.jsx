import { Link, useNavigate } from 'react-router';
import logo from '@assets/logo.svg';
import alarm from '@assets/icons/icon_alarm_37.svg';
import noAlarm from '@assets/icons/icon_no_alarm_37.svg';
import noProfile from '@assets/icons/icon_profile_default_36.svg';
import { useState } from 'react';
import supabase from '@libs/supabase';
import useUserStore from '@store/useUserStore';

const Header = () => {
  const { authUser, profile, resetUser } = useUserStore();
  const [isAlarm, setIsAlarm] = useState(false);
  const navigate = useNavigate();

  const profileImg = profile?.img_url;

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert('로그아웃 실패: ' + error.message);
      return;
    }

    resetUser();
    alert('로그아웃 되었습니다!');
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between h-[74px] px-6 py-4 shadow-md text-2xl md:text-xl sm:text-lg z-10">
      <Link to="/" className="flex items-center gap-2 text-inherit">
        <img src={logo} alt="책꼬지 로고" className="w-12 md:w-10 sm:w-8" />
        <h1 className="m-0">책꼬지</h1>
      </Link>

      <nav className="flex items-center gap-5">
        {authUser ? (
          <>
            <Link to="#" className="hidden sm:block">
              스터디 생성
            </Link>
            <img
              src={isAlarm ? alarm : noAlarm}
              alt="알림"
              className="w-9 md:w-8 sm:w-7"
            />
            <img
              src={profileImg || noProfile}
              alt="유저 이미지"
              className="w-12 h-12 object-cover rounded-full"
            />
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
