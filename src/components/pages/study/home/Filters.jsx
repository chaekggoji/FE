import { useRef } from 'react';
import { DURATION_FILTERS, BOOK_CATEGORIES } from '@/constants/bookSearch';
import useModalDismiss from '@hooks/useModalDismiss';

export default function Filters({ duration, setDuration, category, setCategory, openDropdown, setOpenDropdown }) {
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
    <div className='flex gap-x-4'>
      {/* 기간 드롭다운 */}
      <div className='relative bg-white rounded-lg text-left' ref={durationRef}>
        <button
          onClick={() => setOpenDropdown(isDurationOpen ? null : 'duration')}
          className={`border text-2xl px-4 py-2 rounded-lg w-40 text-left ${isDurationOpen ? 'bg-primary-200' : ''}`}
        >
          {duration || '기간 선택'}
        </button>

        {isDurationOpen && (
          <div className='absolute text-2xl left-0 right-0 text-gray-950 bg-white border rounded-lg shadow-lg z-100'>
            {DURATION_FILTERS.map((option) => (
              <div
                key={option.value}
                className='p-4 hover:bg-primary-200 cursor-pointer'
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
      <div className='relative bg-white rounded-lg text-left' ref={categoryRef}>
        <button
          onClick={() => setOpenDropdown(isCategoryOpen ? null : 'category')}
          className={`border text-2xl px-4 py-2 rounded-lg w-40 text-left ${isCategoryOpen ? 'bg-primary-200' : ''}`}
        >
          {category || '카테고리 선택'}
        </button>
        {isCategoryOpen && (
          <div className='absolute text-2xl left-0 right-0 text-gray-950 bg-white border rounded-lg shadow-md z-100'>
            {BOOK_CATEGORIES.map((option) => (
              <div
                key={option.value}
                className='p-4 hover:bg-primary-200 cursor-pointer'
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
