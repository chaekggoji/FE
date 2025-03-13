import { useRef, useState } from 'react';
import tagDelete from '@assets/icons/icon_x_24.svg';

const InterestSelect = ({ value = [], onChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectBoxRef = useRef(null);

  const interestOptions = [
    '관심분야 1',
    '관심분야 2',
    '관심분야 3',
    '관심분야 4',
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleInterestSelect = (option) => {
    if (value.includes(option)) {
      onChange(value.filter((item) => item !== option));
    } else if (value.length < 3) {
      onChange([...value, option]);
      setIsDropdownOpen(false);
    }
  };

  const handleRemoveInterestTag = (option, e) => {
    e.stopPropagation(); // 드롭다운이 열리는 것을 방지
    onChange(value.filter((item) => item !== option));
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
            {value.map((item) => (
              <span
                key={item}
                className="bg-primary-300 text-white px-3 py-1 text-sm rounded-md flex items-center gap-2"
              >
                {item}
                <img
                  src={tagDelete}
                  alt="관심분야 삭제"
                  className="cursor-pointer"
                  onClick={(e) => handleRemoveInterestTag(item, e)}
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
        {interestOptions.map((option) => (
          <li
            key={option}
            className={`px-4 py-2 text-md cursor-pointer ${value.includes(option) ? 'bg-primary-100' : 'bg-white'} hover:bg-gray-100`}
            onClick={() => handleInterestSelect(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InterestSelect;
