import errorImg from '@assets/images/error.png';
import Button from '@components/common/Button';
import { useNavigate } from 'react-router';

const NoPermission = () => {
  const navigate = useNavigate();
  return (
    <div className="absolute left-1/2 top-1/2 -translate-1/2 flex justify-center flex-col items-center">
      <img src={errorImg} width="160px" className="mb-4" />
      <p className="md:text-2xl text-lg mb-4">접근 권한이 없는 페이지입니다.</p>
      <Button onClick={() => navigate('/', { replace: true })}>
        홈으로 이동
      </Button>
    </div>
  );
};

export default NoPermission;
