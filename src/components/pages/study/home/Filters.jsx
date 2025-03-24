import { useRef } from 'react';
import { DURATION_FILTERS, BOOK_CATEGORIES } from '@/constants/bookSearch';
import useModalDismiss from '@hooks/useModalDismiss';

export default function Filters({
  duration, setDuration,
  category, setCategory,
  openDropdown, setOpenDropdown
}) {
  // 드롭다운 너비 동일하게 하기
  const dropdownWidth = "w-full sm:w-28 md:w-32 lg:w-36";

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
    <div className='flex flex-wrap gap-4'>
      {/* 기간 드롭다운 */}
      <div className='relative min-w-[8rem] sm:min-w-[9rem] md:min-w-[10rem] lg:min-w-[11rem] shrink-0' ref={durationRef}>
        <button
          onClick={() => setOpenDropdown(isDurationOpen ? null : 'duration')}
          className={`border text-sm sm:text-base md:text-lg lg:text-xl px-4 py-2 ${dropdownWidth} rounded-lg text-left ${isDurationOpen ? 'bg-primary-200' : ''}`}
        >
          {duration || '기간 선택'}
        </button>

        {isDurationOpen && (
          <div className={`absolute left-0 z-50 text-base md:text-xl text-gray-950 bg-white border rounded-lg shadow-lg ${dropdownWidth}`}>
            {DURATION_FILTERS.map((option) => (
              <div
                key={option.value}
                className='p-3 hover:bg-primary-200 text-sm sm:text-base md:text-lg cursor-pointer'
                onClick={() => {
                  setDuration(option.label);
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
      <div className='relative min-w-[8rem] sm:min-w-[9rem] md:min-w-[10rem] lg:min-w-[11rem] shrink-0' ref={categoryRef}>
        <button
          onClick={() => setOpenDropdown(isCategoryOpen ? null : 'category')}
          className={`border text-sm sm:text-base md:text-lg lg:text-xl px-4 py-2 ${dropdownWidth} rounded-lg text-left ${isCategoryOpen ? 'bg-primary-200' : ''}`}
        >
          {category || '카테고리 선택'}
        </button>


        {isCategoryOpen && (
          <div className={`absolute left-0 z-50 text-base md:text-xl text-gray-950 bg-white border rounded-lg shadow-lg ${dropdownWidth}`}>
            {BOOK_CATEGORIES.map((option) => (
              <div
                key={option.value}
                className='p-3 hover:bg-primary-200 text-sm sm:text-base md:text-lg cursor-pointer'
                onClick={() => {
                  setCategory(option.label);
                  setOpenDropdown(null);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
