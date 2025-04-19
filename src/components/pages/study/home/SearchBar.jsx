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
    setOpenDropdown(null); // 드롭다운 닫기
    onSearch();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='flex items-center gap-2 my-8'>
      <div className='relative shrink-0' ref={filterRef}>
        <button
          onClick={() => setOpenDropdown(isFilterOpen ? null : 'search-filter')}
          className={`bg-primary-200 border-2 border-primary-400/50 text-white text-sm sm:text-lg md:text-xl px-2 sm:px-4 rounded-lg text-left cursor-pointer w-24 sm:w-36 md:w-40 h-10 sm:h-12 md:h-14 flex items-center`}
        >
          {selectedLabel}
        </button>

        {isFilterOpen && (
          <div className={`absolute left-0 bg-white border-2 border-primary-300/50 shadow-md rounded-lg z-20 text-gray-950 w-24 sm:w-36 md:w-40`}>
            {SEARCH_CATEGORIES.map((option) => (
              <div
                key={option.value}
                className='p-2 sm:p-4 hover:bg-primary-200 text-sm sm:text-base md:text-xl hover:text-white cursor-pointer'
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

      <div className='flex flex-1 gap-2'>
        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              setOpenDropdown(null);  // 드롭다운 닫고
              onSearch();
            }
          }}
          placeholder='원하는 스터디를 찾아보세요'
          className='flex-1 bg-white border-2 border-primary-300 text-sm sm:text-base md:text-xl rounded-lg px-2 sm:px-4 h-10 sm:h-12 md:h-14 focus:text-primary-300 min-w-0'
        />
        <button
          onClick={() => {
            setOpenDropdown(null); // 드롭다운 강제 닫기
            onSearch();
          }}
          className='bg-primary-200 rounded-lg flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 cursor-pointer shrink-0'
        >
          <img src={SearchIcon} alt='검색' className='w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7' />
        </button>
      </div>
    </div>
  );
}
