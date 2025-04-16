import { useEffect, useState } from 'react';
import BookItem from '@components/common/BookItem';
import useMediaQuery from '@hooks/useMediaQuery';

/*
 * 추천 도서를 슬라이드 형태로 보여주는 컴포넌트
 * @param {Object[]} books - 표시할 도서 목록
 * @param {boolean} autoSlide - 자동 슬라이드 여부 (기본값: true)
 */
const RecommendedBookSlider = ({ books = [], autoSlide = true }) => {
  // 디바이스 타입에 따른 미디어 쿼리 설정
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // 디바이스 타입에 따른 한 슬라이드당 표시할 도서 수
  const groupSize = isMobile ? 2 : isTablet ? 3 : 4;

  // 슬라이드 상태 관리
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 표시 중인 슬라이드 인덱스
  const [isAnimating, setIsAnimating] = useState(false); // 애니메이션 진행 중 여부
  const [noTransition, setNoTransition] = useState(false); // transition 효과 제어

  // 총 12권의 도서를 맞추기 위해 부족한 경우 null로 채움
  const filledBooks = [...books];
  while (filledBooks.length < 12) {
    filledBooks.push(null);
  }

  // 도서를 groupSize만큼 묶어서 슬라이드 그룹 생성
  const slideGroups = [];
  for (let i = 0; i < filledBooks.length; i += groupSize) {
    const group = filledBooks.slice(i, i + groupSize);
    while (group.length < groupSize) {
      group.push(null);
    }
    slideGroups.push(group);
  }

  // 순환 슬라이드를 위해 슬라이드 그룹을 3번 반복하여 확장
  // [1,2,3] -> [1,2,3,1,2,3,1,2,3]
  const extendedGroups = [
    ...slideGroups,
    ...slideGroups,
    ...slideGroups
  ];

  /*
   * 현재 표시 중인 실제 슬라이드 인덱스를 계산
   * @returns {number} 실제 표시 중인 슬라이드 인덱스
   */
  const getDisplayIndex = () => {
    return currentIndex % slideGroups.length;
  };

  /*
   * 이전 슬라이드로 이동하는 핸들러
   * 첫 번째 슬라이드에서 이전으로 이동할 경우 마지막 슬라이드로 순간 이동
   */
  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => prev - 1);

    setTimeout(() => {
      // 첫 번째 섹션의 마지막에 도달하면 두 번째 섹션으로 순간 이동
      if (currentIndex <= 0) {
        setNoTransition(true); // transition 효과 제거
        setCurrentIndex(slideGroups.length);
        // 다음 프레임에서 transition 효과 복구
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setNoTransition(false);
          });
        });
      }
      setIsAnimating(false);
    }, 500);
  };

  /*
   * 다음 슬라이드로 이동하는 핸들러
   * 마지막 슬라이드에서 다음으로 이동할 경우 첫 번째 슬라이드로 순간 이동
   */
  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => prev + 1);

    setTimeout(() => {
      // 두 번째 섹션의 마지막에 도달하면 첫 번째 섹션으로 순간 이동
      if (currentIndex >= slideGroups.length * 2 - 1) {
        setNoTransition(true); // transition 효과 제거
        setCurrentIndex(slideGroups.length);
        // 다음 프레임에서 transition 효과 복구
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setNoTransition(false);
          });
        });
      }
      setIsAnimating(false);
    }, 500);
  };

  // 컴포넌트 마운트 시, 초기 인덱스 설정
  useEffect(() => {
    setCurrentIndex(slideGroups.length);
  }, []);

  // 자동 슬라이드 설정
  useEffect(() => {
    if (autoSlide && !isAnimating) {
      const interval = setInterval(() => {
        handleNext();
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, isAnimating]);

  return (
    <div className='relative w-full my-12'>
      {/* 슬라이드 컨테이너 */}
      <div className='overflow-hidden mx-12'>
        <div
          className='flex'
          style={{
            width: `${extendedGroups.length * 100}%`,
            transform: `translateX(-${(currentIndex * 100) / extendedGroups.length}%)`,
            transition: noTransition ? 'none' : 'transform 500ms ease-in-out'
          }}
        >
          {extendedGroups.map((group, groupIdx) => (
            <div
              key={groupIdx}
              className='flex justify-between shrink-0 w-full'
              style={{
                width: `${100 / extendedGroups.length}%`,
              }}
            >
              {group.map((book, index) => (
                <div
                  key={index}
                  className='flex-1'
                  style={{
                    maxWidth: isMobile ? '160px' : isTablet ? '180px' : '240px',
                    minWidth: isMobile ? '140px' : isTablet ? '160px' : '200px',
                    margin: '0 0.5rem'
                  }}
                >
                  {book ? (
                    <BookItem
                      title={book.title}
                      author={book.authors?.[0] || '작자 미상'}
                      thumbnail={book.thumbnail}
                      link={book.url}
                      size={isMobile ? 'small' : isTablet ? 'medium' : 'large'}
                    />
                  ) : (
                    <div className='invisible' style={{
                      width: isMobile ? '120px' : isTablet ? '180px' : '240px',
                      height: isMobile ? '174px' : isTablet ? '261px' : '348px'
                    }} />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 좌우 네비게이션 버튼 */}
      <button
        onClick={handlePrev}
        className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-primary-200 hover:bg-primary-300 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-md'
      >
        ◀
      </button>
      <button
        onClick={handleNext}
        className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-primary-200 hover:bg-primary-300 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-md'
      >
        ▶
      </button>

      {/* 슬라이드 인디케이터 */}
      <div className='flex justify-center mt-4 gap-2'>
        {slideGroups.map((_, index) => (
          <div
            key={index}
            className={`w-[10px] h-[10px] rounded-full ${getDisplayIndex() === index ? 'bg-primary-300' : 'bg-gray-300'
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedBookSlider;
