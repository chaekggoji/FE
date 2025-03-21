import useModalDismiss from '@hooks/useModalDismiss';
import { useRef, useState } from 'react';

const CategoryDropdown = () => {
  // 카테고리 더미 데이터(상수 처리 vs DB 호출 고려 중)
  const BookCategoryList = [
    { id: 1, title: '자기계발' },
    { id: 2, title: '인문' },
    { id: 3, title: '경제/경영' },
    { id: 4, title: '처세' },
    { id: 5, title: 'IT' },
    { id: 6, title: '소설' },
    { id: 7, title: '과학' },
    { id: 8, title: '시/에세이' },
    { id: 9, title: '역사/문화' },
    { id: 10, title: '건강' },
    { id: 11, title: '요리' },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [dropdownValue, setDropdownValue] =
    useState('도서 카테고리를 선택해주세요.');

  // 카테고리 드롭다운(추가 수정 예정)
  const BookCategoryOption = BookCategoryList.map((item) => (
    <li
      id={item.title}
      key={item.id}
      value={item.id}
      className="hover:bg-primary-100 cursor-pointer"
      onClick={() => {
        setDropdownValue(item.title);
        setIsDropdownOpen(!isDropdownOpen);
      }}
    >
      {item.title}
    </li>
  ));

  useModalDismiss(dropdownRef, () => setIsDropdownOpen(false));

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <label
          htmlFor="bookCategory"
          className="mb-1 text-gray-400 sm:text-2xl"
        >
          도서 카테고리
        </label>
        <button
          type="button"
          className="flex justify-between w-full px-6 py-3 border border-gray-200 rounded-xl sm:text-xl focus:border-primary-300 focus:shadow focus:shadow-primary-300 cursor-pointer focus:outline-hidden"
          id={dropdownValue.id}
          onClick={toggleDropdown}
        >
          {dropdownValue}
          {isDropdownOpen ? (
            <img src="/src/assets/icons/icon_arrow_top_24.svg" />
          ) : (
            <img src="/src/assets/icons/icon_arrow_bottom_24.svg" />
          )}
        </button>
        <ul
          className={`${isDropdownOpen ? 'block' : 'hidden'} absolute left-0 top-[74px] sm:top-[86px] bg-white flex flex-col gap-y-2 w-full px-6 py-3 border border-gray-200 rounded-xl sm:text-xl`}
        >
          {BookCategoryOption}
        </ul>
      </div>
    </>
  );
};

export default CategoryDropdown;
