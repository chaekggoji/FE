import Footer from '@components/layouts/Footer';
import Header from '@components/layouts/Header';
import { Outlet } from 'react-router';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더 */}
      <Header />

      {/* 메인 컨텐츠 */}
      <main className="flex flex-1 flex-col px-10 md:px-8 sm:px-6">
        <Outlet />
      </main>

      {/* 푸터 */}
      <Footer />
    </div>
  );
};

export default Index;
