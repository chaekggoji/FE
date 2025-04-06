import useUserStore from '@store/useUserStore';
import { Navigate, Outlet, useLocation } from 'react-router';

const ProtectedRoute = () => {
  const { authUser } = useUserStore();
  const location = useLocation();

  if (!authUser) {
    if (location.pathname === '/') {
      return <Navigate to="/guide" replace />;
    } else {
      alert('로그인이 필요한 페이지입니다.');
      return <Navigate to="/login" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
