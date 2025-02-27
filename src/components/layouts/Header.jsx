import { Link } from 'react-router';
import logo from '@assets/logo.svg';
import styled from 'styled-components';
import alarm from '@assets/icons/icon_alarm_37.svg';
import noAlarm from '@assets/icons/icon_no_alarm_37.svg';
import noProfile from '@assets/icons/icon_no_profile_24.svg';
import { useState } from 'react';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: inherit;
`;

const LogoImage = styled.img`
  ${({ theme }) => theme.breakpoints.medium} {
    width: 30px;
    height: 32px;
  }

  ${({ theme }) => theme.breakpoints.small} {
    width: 24px;
    height: 26px;
  }
`;

const LogoText = styled.h1`
  line-height: 1;
  margin: 0;
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.title.xl};

  ${({ theme }) => theme.breakpoints.medium} {
    font-size: ${({ theme }) => theme.fontSizes.title.lg};
  }

  ${({ theme }) => theme.breakpoints.small} {
    font-size: ${({ theme }) => theme.fontSizes.title.md};
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const NavLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.title.xl};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};

  ${({ theme }) => theme.breakpoints.medium} {
    font-size: ${({ theme }) => theme.fontSizes.title.lg};
  }

  ${({ theme }) => theme.breakpoints.small} {
    font-size: ${({ theme }) => theme.fontSizes.title.md};
  }
`;

const StudyLink = styled(NavLink)`
  ${({ theme }) => theme.breakpoints.small} {
    display: none;
  }
`;

const AlarmIcon = styled.img`
  display: block;
  align-self: center;
  width: 36px;

  ${({ theme }) => theme.breakpoints.medium} {
    width: 30px;
  }

  ${({ theme }) => theme.breakpoints.small} {
    width: 26px;
  }
`;

const UserImage = styled.img`
  display: block;
  align-self: center;
  width: 50px;

  ${({ theme }) => theme.breakpoints.medium} {
    width: 48px;
  }

  ${({ theme }) => theme.breakpoints.small} {
    width: 44px;
  }
`;

const Header = () => {
  // 로그인 개발 전 useState로.. true면 로그인 상태, false면 로그아웃 상태
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // 알림 상태.. true면 알림 있음, false는 알림 없음..
  const [isAlarm, setIsAlarm] = useState(false);
  return (
    <HeaderContainer>
      <StyledLink to="/">
        <LogoImage src={logo} alt="책꼬지 로고" />
        <LogoText>책꼬지</LogoText>
      </StyledLink>

      <Nav>
        {isLoggedIn ? (
          <>
            <StudyLink to="#">스터디 생성</StudyLink>
            {isAlarm ? (
              <AlarmIcon src={alarm} alt="알림 있음" />
            ) : (
              <AlarmIcon src={noAlarm} alt="알림 없음" />
            )}
            <UserImage src={noProfile} alt="유저이미지" />
          </>
        ) : (
          <>
            <StudyLink to="#">스터디 생성</StudyLink>
            <NavLink to="/users/login">로그인</NavLink>
          </>
        )}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
