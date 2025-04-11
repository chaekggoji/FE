import { useEffect, useState } from 'react';
import BookItem from '@components/common/BookItem';

const RecommendedBookSlider = ({ books = [], autoSlide = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const groupSize = 4; // 한 번에 보여줄 책 수

  // books 배열을 groupSize 개씩 묶어서 슬라이드 그룹 만들기
  const slideGroups = [];
  for (let i = 0; i < books.length; i += groupSize) {
    slideGroups.push(books.slice(i, i + groupSize));
  }

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex(prev =>
        prev === 0 ? slideGroups.length - 1 : prev - 1
      );
      setIsAnimating(false);
    }, 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex(prev =>
        prev === slideGroups.length - 1 ? 0 : prev + 1
      );
      setIsAnimating(false);
    }, 500);
  };

  useEffect(() => {
    if (autoSlide) {
      const interval = setInterval(() => {
        handleNext();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [currentIndex]);

  return (
    <div className="relative w-full max-w-[1200px] mx-auto my-12 overflow-hidden">
      {/* 슬라이드 그룹을 감싸는 컨테이너 */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          width: `${slideGroups.length * 100}%`,
          transform: `translateX(-${currentIndex * (100 / slideGroups.length)}%)`
        }}
      >
        {slideGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="flex w-full">
            {group.map((book, index) => (
              <div key={index} className="w-1/4 px-2">
                <BookItem
                  title={book.title}
                  author={book.authors?.[0] || '작자 미상'}
                  thumbnail={book.thumbnail}
                  link={book.url}
                  size="large"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ← 이전 버튼 */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-primary-200 hover:bg-primary-300 text-white w-10 h-10 rounded-full flex items-center justify-center"
      >
        ◀
      </button>

      {/* → 다음 버튼 */}
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-primary-200 hover:bg-primary-300 text-white w-10 h-10 rounded-full flex items-center justify-center"
      >
        ▶
      </button>

      {/* 인디케이터 */}
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
