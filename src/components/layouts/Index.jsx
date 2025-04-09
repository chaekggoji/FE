import Footer from '@components/layouts/Footer';
import Header from '@components/layouts/Header';
import { Outlet, useMatch } from 'react-router';

const Index = () => {
  const matchStudyDetail = useMatch('/study/*');
  const matchProfile = useMatch('/profile/*');
  const matchProfileEdit = useMatch('/profile/:userId/edit');

  const hasFooter = matchStudyDetail || matchProfile;

  // 배경색 적용 여부 (profile 페이지이지만 edit 페이지는 제외)
  const applyBg = matchProfile && !matchProfileEdit;

  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더 */}
      <Header />

      {/* 메인 컨텐츠 */}
      <main
        className={`flex flex-1 flex-col lg:px-10 md:px-8 sm:px-6 ${applyBg ? 'bg-primary-100' : ''}`}
      >
        <Outlet />
      </main>

      {/* 푸터 */}
      {!hasFooter && <Footer />}
    </div>
  );
};

export default Index;
