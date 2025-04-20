import SeverErrorImg from '@assets/images/DataError.png';
import Button from '@components/common/Button';
import { useNavigate } from 'react-router';

const SeverError = () => {
  const navigate = useNavigate();
  return (
    <div className="absolute left-1/2 top-1/2 -translate-1/2 flex justify-center flex-col items-center">
      <img src={SeverErrorImg} width="160px" className="mb-4" />
      <p className="md:text-2xl text-lg">
        서버에서 예상치 못한 오류가 발생했습니다.
      </p>
      <p className="md:text-2xl text-lg mb-4">잠시 후 다시 시도해 주세요.</p>
      <Button onClick={() => navigate('/', { replace: true })}>
        홈으로 이동
      </Button>
    </div>
  );
};

export default SeverError;
