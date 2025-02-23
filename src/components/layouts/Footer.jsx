import { Link } from 'react-router';
import styled from 'styled-components';
import githubIco from '@assets/icons/github.svg';
import mailIco from '@assets/icons/mail.svg';

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  height: auto;
  min-height: 100px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25) inset;

  ${({ theme }) => theme.breakpoints.large} {
    min-height: 150px;
  }

  ${({ theme }) => theme.breakpoints.medium} {
    min-height: 120px;
    padding: 16px 0;
  }

  ${({ theme }) => theme.breakpoints.small} {
    min-height: 100px;
    padding: 12px 0;
  }
`;

const Copyright = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.text['xl']};
  margin-bottom: 40px;

  ${({ theme }) => theme.breakpoints.medium} {
    font-size: ${({ theme }) => theme.fontSizes.text.lg};
    margin-bottom: 30px;
  }

  ${({ theme }) => theme.breakpoints.small} {
    font-size: ${({ theme }) => theme.fontSizes.text.md};
    margin-bottom: 20px;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 60px;
  align-items: center;

  ${({ theme }) => theme.breakpoints.medium} {
    flex-direction: column;
    gap: 20px;
  }

  ${({ theme }) => theme.breakpoints.small} {
    flex-direction: row;
    gap: 15px;
  }
`;

const IconTextLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 20px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.text['xl']};

  ${({ theme }) => theme.breakpoints.medium} {
    font-size: ${({ theme }) => theme.fontSizes.text.lg};
  }

  ${({ theme }) => theme.breakpoints.small} {
    font-size: 0;
  }
`;

const FooterLinkIco = styled.img`
  width: 24px;
  height: 24px;

  ${({ theme }) => theme.breakpoints.medium} {
    width: 18px;
    height: 18px;
  }

  ${({ theme }) => theme.breakpoints.small} {
    width: 16px;
    height: 16px;
  }
`;

const FooterLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.text['xl']};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Copyright>
        © {new Date().getFullYear()} 쁘로젝또. All Rights Reserved.
      </Copyright>
      <FooterLinks>
        <FooterLink to="#">개인정보처리방침</FooterLink>

        <IconTextLink to="https://github.com/chaekggoji/FE">
          <FooterLinkIco src={githubIco} alt="깃허브 아이콘" />
          GitHub
        </IconTextLink>
        <IconTextLink to="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=comeseul312@gmail.com">
          <FooterLinkIco src={mailIco} alt="메일 아이콘" />
          문의하기
        </IconTextLink>
      </FooterLinks>
    </FooterContainer>
  );
};

export default Footer;
