import { useEffect, useState } from 'react';
import BookItem from '@components/common/BookItem';
import useMediaQuery from '@hooks/useMediaQuery';

// 이 컴포넌트는 추천 도서를 슬라이드 형태로 보여주는 컴포넌트야
const RecommendedBookSlider = ({ books = [], autoSlide = true }) => {
  // 미디어 쿼리를 이용해 현재 디바이스 타입을 판단
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // 각 디바이스에 맞는 슬라이드당 책 개수 지정
  const groupSize = isMobile ? 2 : isTablet ? 3 : 4;

  // 현재 보여지고 있는 슬라이드의 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);

  // 애니메이션 중 중복 클릭 방지용 상태
  const [isAnimating, setIsAnimating] = useState(false);

  // 총 12권을 맞추기 위해 부족하면 null로 채움 (렌더링 시 자리만 차지하고 안 보이게 하기 위함)
  const filledBooks = [...books];
  while (filledBooks.length < 12) {
    filledBooks.push(null); // null은 빈칸 역할
  }

  // books 배열을 groupSize만큼 묶어 슬라이드 그룹을 만듦
  const slideGroups = [];
  for (let i = 0; i < filledBooks.length; i += groupSize) {
    const group = filledBooks.slice(i, i + groupSize); // groupSize 단위로 자르기
    slideGroups.push(group); // [ [책1~4], [책5~8], [책9~12] ]
  }

  // 이전 슬라이드 버튼 핸들러
  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      // 첫 번째 슬라이드에서 왼쪽으로 가면 마지막으로 루프됨
      setCurrentIndex(prev =>
        prev === 0 ? slideGroups.length - 1 : prev - 1
      );
      setIsAnimating(false);
    }, 300); // 애니메이션 시간과 맞추기
  };

  // 다음 슬라이드 버튼 핸들러
  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      // 마지막 슬라이드에서 오른쪽으로 가면 처음으로 루프됨
      setCurrentIndex(prev =>
        prev === slideGroups.length - 1 ? 0 : prev + 1
      );
      setIsAnimating(false);
    }, 300);
  };

  // 자동 슬라이드 동작 - 4초마다 다음 슬라이드로 이동
  useEffect(() => {
    if (autoSlide) {
      const interval = setInterval(() => {
        handleNext();
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [currentIndex]); // currentIndex가 바뀔 때마다 재설정됨

  return (
    <div className="relative w-full my-12 px-4 overflow-hidden">
      {/* 슬라이드 그룹 전체 wrapper */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          width: `${slideGroups.length * 100}%`, // 전체 슬라이드 wrapper의 너비는 그룹 개수만큼
          transform: `translateX(-${currentIndex * (100 / slideGroups.length)}%)` // 현재 인덱스에 따라 왼쪽으로 이동
        }}
      >
        {/* 각 슬라이드 그룹 (한 그룹에 groupSize개의 책이 들어감) */}
        {slideGroups.map((group, groupIdx) => (
          <div
            key={groupIdx}
            className="flex justify-between gap-6 shrink-0 px-12"
            style={{ width: `${100 / slideGroups.length}%` }} // 각 슬라이드 그룹의 너비
          >
            {/* 그룹 안의 책들 렌더링 */}
            {group.map((book, index) => (
              <div key={index} className="flex-1 min-w-0 max-w-[220px]">
                {book ? (
                  <BookItem
                    title={book.title}
                    author={book.authors?.[0] || '작자 미상'}
                    thumbnail={book.thumbnail}
                    link={book.url}
                    size="large"
                  />
                ) : (
                  // null인 경우에는 invisible 박스만 렌더링하여 자리를 유지
                  <div className="invisible" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* 좌우 화살표 버튼 */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-primary-200 hover:bg-primary-300 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md"
      >
        ◀
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-primary-200 hover:bg-primary-300 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md"
      >
        ▶
      </button>

      {/* 인디케이터 (슬라이드 개수 만큼 점 표시) */}
      <div className="flex justify-center mt-4 gap-2">
        {slideGroups.map((_, index) => (
          <div
            key={index}
            className={`w-[10px] h-[10px] rounded-full ${index === currentIndex ? 'bg-primary-300' : 'bg-gray-300'
              }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedBookSlider;
