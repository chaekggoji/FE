import useModalDismiss from '@hooks/useModalDismiss';
import supabase from '@libs/supabase';
import { useEffect, useRef, useState } from 'react';

const CategoryDropdown = ({ categoryValue, setCategoryValue }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('book_categories')
          .select('id, title');

        if (error) throw error;
        setCategories(data);
      } catch (error) {
        console.error('카테고리 로드 에러:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // 카테고리 드롭다운(추가 수정 예정)
  const BookCategoryOption = categories?.map((item) => (
    <li
      id={item.title}
      key={item.id}
      value={item.id}
      className="hover:bg-primary-100 cursor-pointer"
      onClick={() => {
        setCategoryValue(item.title);
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
          onClick={toggleDropdown}
        >
          {categoryValue}
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
