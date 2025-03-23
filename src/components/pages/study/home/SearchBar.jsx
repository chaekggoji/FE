import { useRef } from 'react';
import { SEARCH_CATEGORIES } from '@/constants/bookSearch';
import SearchIcon from '@assets/icons/icon_search_24.svg';
import useModalDismiss from '@hooks/useModalDismiss';

export default function SearchBar({
  search, setSearch,
  filter, setFilter,
  onSearch,
  openDropdown, setOpenDropdown
}) {
  const filterRef = useRef(null);
  const isFilterOpen = openDropdown === 'search-filter';

  useModalDismiss(filterRef, () => {
    if (isFilterOpen) setOpenDropdown(null);
  });

  return (
    <div className='flex items-center gap-4 my-8'>
      {/* 필터 선택 */}
      <div className='relative' ref={filterRef}>
        <button
          onClick={() => setOpenDropdown(isFilterOpen ? null : 'search-filter')}
          className='bg-primary-200 border-2 border-primary-400/50 text-white text-3xl px-4 py-2.5 rounded-lg w-40 text-left'
        >
          {filter || '필터 선택'}
        </button>
        {isFilterOpen && (
          <div className='absolute left-0 right-0 text-gray-950 bg-white border-2 border-primary-300/50 shadow-md rounded-lg z-20'>
            {SEARCH_CATEGORIES.filter(option => option.label !== 'ALL').map((option) => (
              <div
                key={option.value}
                className='p-4 hover:bg-primary-200 text-2xl hover:text-white cursor-pointer'
                onClick={() => {
                  setFilter(option.label);
                  setOpenDropdown(null);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 검색 입력 */}
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='원하는 스터디를 찾아보세요'
        className='bg-white border-2 border-primary-300 text-3xl rounded-lg px-4 py-2 focus:text-primary-300 flex-grow'
      />

      {/* 검색 버튼 */}
      <button
        onClick={onSearch}
        className='bg-primary-200 p-2 rounded-full flex items-center justify-center w-15 h-15'
      >
        <img src={SearchIcon} alt='검색' className='w-8 h-8 white' />
      </button>
    </div>
  );
}
