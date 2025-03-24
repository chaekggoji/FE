import { useRef } from 'react';
import useModalDismiss from '@hooks/useModalDismiss';
import { SORT_OPTIONS } from '@/constants/bookSearch';

export default function SortDropdown({ sort, setSort, openDropdown, setOpenDropdown }) {
  const dropdownRef = useRef(null);
  const isSortOpen = openDropdown === 'sort';

  // 정렬 드롭다운 열기/닫기 토글
  const toggleDropdown = () => {
    if (isSortOpen) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown('sort');
    }
  };

  useModalDismiss(dropdownRef, () => {
    if (isSortOpen) setOpenDropdown(null);
  });

  const displayedSort = sort || '정렬';

  return (
    <div className='relative w-full sm:w-32 md:w-36 lg:w-40' ref={dropdownRef}>
      {/* 드롭다운 버튼 */}
      <button
        onClick={toggleDropdown}
        className='bg-primary-200 border-2 border-primary-400/50 text-white text-sm sm:text-base md:text-lg lg:text-xl px-4 py-2 w-full sm:w-32 md:w-36 lg:w-40 rounded-lg text-left'
      >
        {displayedSort}
      </button>

      {/* 드롭다운 메뉴 */}
      {isSortOpen && (
        <div className='absolute w-full left-0 right-0 bg-white border-2 border-primary-300/50 rounded-lg shadow-md z-20'>
          {SORT_OPTIONS.map((option) => (
            <div
              key={option.value}
              className='p-3 hover:bg-primary-200 text-sm sm:text-base md:text-lg text-gray-950 hover:text-white cursor-pointer'
              onClick={() => {
                setSort(option.value);
                setOpenDropdown(null);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
