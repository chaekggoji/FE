import { useRef, useState } from 'react';
import tagDelete from '@assets/icons/icon_x_24.svg';
import supabase from '@libs/supabase';

const InterestSelect = ({ value = [], onChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const selectBoxRef = useRef(null);

  // 컴포넌트 마운트 시 카테고리 데이터 로드
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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleInterestSelect = (category) => {
    if (value.some((item) => item.id === category.id)) {
      onChange(value.filter((item) => item.id !== category.id));
    } else if (value.length < 3) {
      onChange([...value, category]);
      setIsDropdownOpen(false);
    }
  };

  const handleRemoveInterestTag = (category, e) => {
    e.stopPropagation(); // 드롭다운이 열리는 것을 방지
    onChange(value.filter((item) => item.id !== category.id));
  };

  return (
    <div className="relative w-full">
      <div
        ref={selectBoxRef}
        className="w-full min-h-[48px] px-4 border border-gray-300 rounded-lg text-gray-600 flex flex-wrap items-center gap-2 cursor-pointer bg-white"
        onClick={toggleDropdown}
      >
        {value.length > 0 ? (
          <>
            {value.map((category) => (
              <span
                key={category.id}
                className="bg-primary-300 text-white px-3 py-1 text-sm rounded-md flex items-center gap-2"
              >
                {category.title}
                <img
                  src={tagDelete}
                  alt="관심분야 삭제"
                  className="cursor-pointer"
                  onClick={(e) => handleRemoveInterestTag(category, e)}
                />
              </span>
            ))}
            <span className="ml-auto text-xs text-gray-400">
              {value.length}/3
            </span>
          </>
        ) : (
          <span className="text-gray-400">관심 분야를 선택하세요</span>
        )}
      </div>

      <ul
        className={`absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-1 py-2 max-h-[200px] overflow-y-auto z-50 ${isDropdownOpen ? 'block' : 'hidden'}`}
      >
        {isLoading ? (
          <li className="px-4 py-2 text-md">로딩 중...</li>
        ) : (
          categories.map((category) => (
            <li
              key={category.id}
              className={`px-4 py-2 text-md cursor-pointer ${
                value.some((item) => item.id === category.id)
                  ? 'bg-primary-100'
                  : 'bg-white'
              } hover:bg-gray-100`}
              onClick={() => handleInterestSelect(category)}
            >
              {category.title}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default InterestSelect;
