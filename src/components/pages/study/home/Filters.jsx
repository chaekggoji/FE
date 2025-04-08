import { useRef } from 'react';
import { DURATION_FILTERS } from '@/constants/bookSearch';
import useModalDismiss from '@hooks/useModalDismiss';

export default function Filters({
  duration, setDuration,
  category, setCategory,
  openDropdown, setOpenDropdown,
  categoryList
}) {
  // 드롭다운 너비 동일하게 하기
  const dropdownWidth = 'w-full sm:w-28 md:w-32 lg:w-36';

  const durationRef = useRef(null);
  const categoryRef = useRef(null);

  const isDurationOpen = openDropdown === 'duration';
  const isCategoryOpen = openDropdown === 'category';

  useModalDismiss(durationRef, () => {
    if (isDurationOpen) setOpenDropdown(null);
  });

  useModalDismiss(categoryRef, () => {
    if (isCategoryOpen) setOpenDropdown(null);
  });

  return (
    <div className='flex flex-wrap'>
      {/* 기간 드롭다운 */}
      <div className='relative min-w-[7rem] sm:min-w-[8rem] md:min-w-[9rem] lg:min-w-[11rem] shrink-0' ref={durationRef}>
        <button
          onClick={() => setOpenDropdown(isDurationOpen ? null : 'duration')}
          className={`border text-sm sm:text-base md:text-lg lg:text-xl px-4 py-2 ${dropdownWidth} rounded-lg text-left ${isDurationOpen ? 'bg-primary-200' : ''}`}
        >
          {DURATION_FILTERS.find(opt => opt.value === duration)?.label || '기간 선택'}
        </button>

        {isDurationOpen && (
          <div className={`absolute left-0 z-50 text-base md:text-xl text-gray-950 bg-white border rounded-lg shadow-lg ${dropdownWidth}`}>
            {DURATION_FILTERS.map((option) => (
              <div
                key={option.label}
                className='p-3 hover:bg-primary-200 text-sm sm:text-base md:text-lg cursor-pointer'
                onClick={() => {
                  setDuration(option.value);
                  setOpenDropdown(null);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 카테고리 드롭다운 */}
      <div className='relative min-w-[7rem] sm:min-w-[8rem] md:min-w-[9rem] lg:min-w-[11rem] shrink-0' ref={categoryRef}>
        <button
          onClick={() => setOpenDropdown(isCategoryOpen ? null : 'category')}
          className={`border text-sm sm:text-base md:text-lg lg:text-xl px-4 py-2 ${dropdownWidth} rounded-lg text-left ${isCategoryOpen ? 'bg-primary-200' : ''}`}
        >
          {category || '카테고리 선택'}
        </button>


        {isCategoryOpen && (
          <div className={`absolute left-0 z-50 text-base md:text-xl text-gray-950 bg-white border rounded-lg shadow-lg ${dropdownWidth}`}>

            {/* ✅ 카테고리 전체 옵션 추가 */}
            <div
              className='p-3 hover:bg-primary-200 text-sm sm:text-base md:text-lg cursor-pointer'
              onClick={() => {
                setCategory(''); // 전체 보기 상태로
                setOpenDropdown(null);
              }}
            >
              카테고리 전체
            </div>

            {/* ✅ Supabase에서 가져온 카테고리 목록 */}
            {categoryList.map((title) => (
              <div
                key={title}
                className='p-3 hover:bg-primary-200 text-sm sm:text-base md:text-lg cursor-pointer'
                onClick={() => {
                  setCategory(title);
                  setOpenDropdown(null);
                }}
              >
                {title}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
