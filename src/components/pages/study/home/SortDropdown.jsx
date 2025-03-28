import { useRef } from 'react';
import useModalDismiss from '@hooks/useModalDismiss';

export default function SortDropdown({
  sort, setSort,
  openDropdown, setOpenDropdown,
  sortOptions = [],
  buttonClassName = '',
  menuClassName = '',
  itemClassName = '',
  widthClass = '',
}) {
  const dropdownRef = useRef(null);
  const isSortOpen = openDropdown === 'sort';

  const toggleDropdown = () => {
    setOpenDropdown(isSortOpen ? null : 'sort');
  };

  useModalDismiss(dropdownRef, () => {
    if (isSortOpen) setOpenDropdown(null);
  });

  const currentSortOption = sortOptions.find((opt) => opt.value === sort);
  const displayedSort = currentSortOption?.label || '정렬';

  return (
    <div className={`relative ${widthClass}`} ref={dropdownRef}>
      {/* ▼ 닫혀 있을 때 보이는 버튼 */}
      <button
        onClick={toggleDropdown}
        className={`
          border-2 px-4 py-2 w-full rounded-lg text-left
          text-sm sm:text-base md:text-lg lg:text-xl
          ${buttonClassName}
        `}
      >
        {displayedSort}
      </button>

      {/* ▼ 드롭다운 펼쳐졌을 때 메뉴 */}
      {isSortOpen && (
        <div
          className={`
          absolute left-0 w-full
          bg-white rounded-lg shadow-md z-20 border-2
          ${menuClassName}
        `}
        >
          {sortOptions.map((option) => {
            const isSelected = sort === option.value;

            return (
              <div
                key={option.label}
                className={`
                  p-3 cursor-pointer
                  text-sm sm:text-base md:text-lg
                  text-gray-900
                  hover:bg-primary-200
                  ${itemClassName}
                `}
                onClick={() => {
                  setSort(option.value);
                  setOpenDropdown(null);
                }}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
