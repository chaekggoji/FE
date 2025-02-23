import Footer from '@components/layouts/Footer';
import Header from '@components/layouts/Header';
import { Outlet } from 'react-router';

const Index = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Index;
