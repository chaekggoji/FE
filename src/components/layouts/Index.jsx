import Footer from '@components/layouts/Footer';
import Header from '@components/layouts/Header';
import { Outlet, useMatch } from 'react-router';

const Index = () => {
  const matchStudyDetail = useMatch('/study/*');
  const matchProfile = useMatch('/profile/*');

  const hasFooter = matchStudyDetail || matchProfile;

  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더 */}
      <Header />

      {/* 메인 컨텐츠 */}
      <main className="flex flex-1 flex-col lg:px-10 md:px-8 sm:px-6">
        <Outlet />
      </main>

      {/* 푸터 */}
      {!hasFooter && <Footer />}
    </div>
  );
};

export default Index;
