import { useRef } from 'react';
import useModalDismiss from '@hooks/useModalDismiss';
import { SEARCH_CATEGORIES } from '@/constants/bookSearch';
import SearchIcon from '@assets/icons/icon_search_24.svg';

export default function SearchBar({
  search, setSearch,
  filter, setFilter,
  setDuration, setCategory, setSort,
  onSearch,
  openDropdown, setOpenDropdown
}) {
  const filterRef = useRef(null);
  const isFilterOpen = openDropdown === 'search-filter';
  const dropdownWidth = 'w-36 sm:w-40';
  const selectedLabel = SEARCH_CATEGORIES.find((option) => option.value === filter)?.label || '필터 선택';

  useModalDismiss(filterRef, () => {
    if (isFilterOpen) setOpenDropdown(null);
  });

  const handleSearch = () => {
    setOpenDropdown(null); // ✅ 드롭다운 닫기
    onSearch();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='flex flex-col gap-4 my-8 md:flex-row md:items-center'>
      <div className='relative' ref={filterRef}>
        <button
          onClick={() => setOpenDropdown(isFilterOpen ? null : 'search-filter')}
          className={`bg-primary-200 border-2 border-primary-400/50 text-white text-base sm:text-lg md:text-xl px-4 py-3 rounded-lg text-left cursor-pointer ${dropdownWidth}`}
        >
          {selectedLabel}
        </button>

        {isFilterOpen && (
          <div className={`absolute left-0 bg-white border-2 border-primary-300/50 shadow-md rounded-lg z-20 text-gray-950 ${dropdownWidth}`}>
            {SEARCH_CATEGORIES.map((option) => (
              <div
                key={option.value}
                className='p-4 hover:bg-primary-200 text-base sm:text-xl hover:text-white cursor-pointer'
                onClick={() => {
                  setFilter(option.value);
                  setOpenDropdown(null);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='flex w-full gap-2'>
        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              setOpenDropdown(null);  // 드롭다운 닫고
              if (search.trim() !== '') onSearch(); // 검색 실행
            }
          }}
          placeholder='원하는 스터디를 찾아보세요'
          className='flex-grow bg-white border-2 border-primary-300 text-base sm:text-xl rounded-lg px-4 py-2 focus:text-primary-300'
        />
        <button
          onClick={() => {
            setOpenDropdown(null); // ✅ 드롭다운 강제 닫기
            if (search.trim() !== '') {
              onSearch(); // ✅ 입력값이 있을 때만 실행
            }
          }}
          className='bg-primary-200 rounded-lg flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 cursor-pointer'
        >
          <img src={SearchIcon} alt='검색' className='w-6 h-6 sm:w-7 sm:h-7' />
        </button>
      </div>
    </div>
  );
}
