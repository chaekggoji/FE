import { useState } from 'react';
import { DURATION_FILTERS, BOOK_CATEGORIES } from '@/constants/bookSearch';

export default function Filters({ duration, setDuration, category, setCategory }) {
  const [isDurationOpen, setIsDurationOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  // 드롭다운 열기/닫기 토글
  const toggleDurationDropdown = () => setIsDurationOpen(!isDurationOpen);
  const toggleCategoryDropdown = () => setIsCategoryOpen(!isCategoryOpen);

  return (
    <div className='flex gap-x-4'>
      {/* 기간 드롭다운 */}
      <div className='relative bg-white rounded-lg text-left'>
        <button
          onClick={toggleDurationDropdown}
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
                  setIsDurationOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 카테고리 드롭다운 */}
      <div className='relative bg-white rounded-lg text-left'>
        <button
          onClick={toggleCategoryDropdown}
          className={`border text-2xl px-4 py-2 rounded-lg w-40 text-left ${isCategoryOpen ? 'bg-primary-200' : ''}`}
        >
          {category || '카테고리 선택'} {/* 선택된 label을 보여줌 */}
        </button>
        {isCategoryOpen && (
          <div className='absolute text-2xl left-0 right-0 text-gray-950 bg-white border rounded-lg shadow-md z-100'>
            {BOOK_CATEGORIES.map((option) => (
              <div
                key={option.value}
                className='p-4 hover:bg-primary-200 cursor-pointer'
                onClick={() => {
                  setCategory(option.label);
                  setIsCategoryOpen(false);
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
