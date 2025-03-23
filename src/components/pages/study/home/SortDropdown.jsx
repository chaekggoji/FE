import { useRef } from 'react';
import { SORT_OPTIONS } from '@/constants/bookSearch'; // 정렬 옵션 상수 파일
import useModalDismiss from '@hooks/useModalDismiss';
import { set } from 'react-hook-form';

export default function SortDropdown({ sort, setSort, openDropdown, setOpenDropdown }) {
  const dropdownRef = useRef(null);
  const isOpen = openDropdown === 'sort'

  // 드롭다운 열기/닫기 토글
  const toggleDropdown = () => {
    if (isOpen) {
      setOpenDropdown(null); // 닫기
    } else {
      setOpenDropdown('sort'); // 열기 -> 다른 드롭다운이 열려 있을 때 강제로 바꿈
    }
  };

  useModalDismiss(dropdownRef, () => {
    setOpenDropdown(null);
  })

  const displayedSort = sort || '정렬';

  return (
    <div className='relative' ref={dropdownRef}>
      {/* 드롭다운 버튼 */}
      <button
        onClick={toggleDropdown}
        className='bg-primary-200 border-2 border-primary-400/50 text-white text-3xl px-4 py-2.5 rounded-lg w-40 text-left'
      >
        {displayedSort}
      </button>

      {isOpen && (
        <div className='absolute left-0 right-0 bg-white border-2 border-primary-400/50 rounded-lg shadow-lg z-20'>
          {SORT_OPTIONS.map((option) => (
            <div
              key={option.value}
              className='p-4 hover:bg-primary-200 text-2xl text-gray-950 hover:text-white cursor-pointer'
              onClick={() => {
                setSort(option.label);  // 클릭 시 label로 설정
                setOpenDropdown(null); // 드롭다운 닫기
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
