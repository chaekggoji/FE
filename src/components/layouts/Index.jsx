import Footer from '@components/layouts/Footer';
import Header from '@components/layouts/Header';
import { Outlet } from 'react-router';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;

  width: 100%;
  margin: 0 auto;
  padding: 0 40px;

  ${({ theme }) => theme.breakpoints.medium} {
    max-width: 900px;
    padding: 0 32px;
  }

  ${({ theme }) => theme.breakpoints.small} {
    max-width: 100%;
    padding: 0 24px;
  }
`;

const Index = () => {
  return (
    <LayoutContainer>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default Index;
