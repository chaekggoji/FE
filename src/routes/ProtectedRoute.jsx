import useLoginStore from '@store/loginStore';
import { Navigate, Outlet, useLocation } from 'react-router';

const ProtectedRoute = () => {
  const { user } = useLoginStore(); // 로그인 여부
  const location = useLocation();

  if (!user && location.pathname === '/') {
    // 로그인이 안 된 유저가 / (스터디 홈)에 접근하는 경우
    return <Navigate to="/guide" replace={true} />;
  } else if (!user) {
    // 로그인이 안 된 유저가 로그인이 필요한 페이지에 접근하는 경우
    alert('로그인이 필요한 페이지입니다.');
    return <Navigate to="/login" replace={true} />; // 이전 페이지 기록 삭제 후 이동
  }
  return <Outlet />;
};

export default ProtectedRoute;
