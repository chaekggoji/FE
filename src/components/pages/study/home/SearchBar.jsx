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

  console.log('setDuration:', setDuration);  // undefined 확인
  console.log('setCategory:', setCategory);  // undefined 확인
  console.log('setSort:', setSort);          // undefined 확인
  const filterRef = useRef(null);
  const isFilterOpen = openDropdown === 'search-filter';
  const dropdownWidth = 'w-36 sm:w-40'; // 버튼과 드롭다운의 동일 너비 유지

  // 기본값 설정 (검색 전)
  const handleSearch = () => {
    console.log("onSearch called");
    // 검색 버튼 클릭 시 필터를 '전체'로 설정하고, 검색을 실행
    setFilter('전체');
    setDuration('전체');
    setCategory('전체');
    setSort('최신순');
    onSearch(); // 검색 실행
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useModalDismiss(filterRef, () => {
    if (isFilterOpen) setOpenDropdown(null);
  });

  return (
    <div className='flex flex-col gap-4 my-8 md:flex-row md:items-center'>
      {/* 필터 선택 */}
      <div className='relative' ref={filterRef}>
        <button
          onClick={() => setOpenDropdown(isFilterOpen ? null : 'search-filter')}
          className={`bg-primary-200 border-2 border-primary-400/50 text-white text-base sm:text-lg md:text-xl px-4 py-2 rounded-lg text-left ${dropdownWidth}`}
        >
          {filter || '필터 선택'}
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

      {/* 검색 입력 + 검색 버튼 */}
      <div className='flex w-full gap-2'>
        <input
          type='text'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            console.log(e.target.value);
          }}
          onKeyUp={handleKeyPress}
          placeholder='원하는 스터디를 찾아보세요'
          className='flex-grow bg-white border-2 border-primary-300 text-base sm:text-xl rounded-lg px-4 py-2 focus:text-primary-300'
        />
        {/* 검색 실행 버튼 */}
        <button
          onClick={handleSearch}
          className='bg-primary-200 rounded-lg flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14'
        >
          <img src={SearchIcon} alt='검색' className='w-6 h-6 sm:w-7 sm:h-7' />
        </button>
      </div>
    </div>
  );
}
