import { Link } from 'react-router';
import logo from '@assets/logo.svg';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const LogoImage = styled.img`
  width: 40px;
  height: 42px;

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
  font-size: ${({ theme }) => theme.fontSizes.title['2xl']};

  ${({ theme }) => theme.breakpoints.medium} {
    font-size: ${({ theme }) => theme.fontSizes.title.xl};
  }

  ${({ theme }) => theme.breakpoints.small} {
    font-size: ${({ theme }) => theme.fontSizes.title.lg};
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.title['2xl']};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};

  ${({ theme }) => theme.breakpoints.medium} {
    font-size: ${({ theme }) => theme.fontSizes.title.xl};
  }

  ${({ theme }) => theme.breakpoints.small} {
    font-size: ${({ theme }) => theme.fontSizes.title.lg};
  }
`;

const StudyLink = styled(NavLink)`
  ${({ theme }) => theme.breakpoints.small} {
    display: none;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Link to="/">
          <LogoImage src={logo} alt="책꼬지 로고" />
        </Link>
        <LogoText>책꼬지</LogoText>
      </LogoContainer>

      <Nav>
        <StudyLink to="#">스터디 생성</StudyLink>
        <NavLink to="#">로그인</NavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
