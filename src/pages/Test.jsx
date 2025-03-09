import Button from '@components/common/Button';
import { useState } from 'react';
import heart from '@assets/icons/icon_heart_24.svg';
import heartFilled from '@assets/icons/icon_heart_filled_24.svg';

const Test = () => {
  const [isCTAActive, setIsCTAActive] = useState(false);
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  return (
    <div className="flex flex-col gap-4 items-center text-center">
      <h1 className="text-lg md:text-base sm:text-sm">Outlet 영역 테스트</h1>
      <p className="text-gray-600">푸터는 항상 브라우저 하단에 고정됩니다</p>

      {/* 버튼 테스트 */}
      <div className="flex flex-col gap-4 items-center">
        {/* CTA 활성/비활성 테스트 */}
        <Button
          size="medium"
          type={isCTAActive ? 'CTA Active' : 'CTA Abled'}
          onClick={() => setIsCTAActive((prev) => !prev)}
        >
          CTA Abled 버튼 (medium)
        </Button>

        {/* 삭제 버튼 활성/비활성 테스트 */}
        <Button
          size="large"
          type={isDeleteActive ? 'CTA Delete Active' : 'CTA Delete'}
          onClick={() => setIsDeleteActive((prev) => !prev)}
        >
          CTA Delete 버튼 (large)
        </Button>

        {/* 비활성화 버튼 */}
        <Button size="small" type="CTA Disabled">
          CTA Disabled 버튼 (small)
        </Button>

        {/* 라인 버튼 */}
        <Button size="small" type="CTA Lined">
          CTA Lined 버튼 (small)
        </Button>
      </div>

      {/* 아이콘 테스트 */}
      <div className="flex gap-4 mt-5">
        <img src={heart} alt="빈 하트" className="w-6 h-6" />
        <img src={heartFilled} alt="채워진 하트" className="w-6 h-6" />
      </div>
    </div>
  );
};

export default Test;
