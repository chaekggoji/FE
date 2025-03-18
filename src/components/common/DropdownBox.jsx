import useOutsideClick from '@hooks/useOutsideClick';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

const DropdownBox = ({
  selectedOption,
  setSelectedOption,
  options,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownBoxRef = useRef(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  // dropdownBox 외부 클릭 시 setIsOpen(false) 실행
  useOutsideClick(dropdownBoxRef, () => setIsOpen(false));
  return (
    <div className={`relative text-center ${className}`} ref={dropdownBoxRef}>
      <button
        className={`bg-white py-1 w-full border-1 border-black cursor-pointer transition-all ${isOpen ? 'rounded-t-2xl' : 'rounded-2xl'}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedOption.value ? selectedOption.name : '정렬 기준'}
      </button>
      <ul
        className={`w-full text-center absolute left-0 top-full transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        {options.map((option, index) => (
          <li
            key={index}
            className={`py-1 cursor-pointer border-1 border-black bg-white hover:bg-primary-100 ${index === options.length - 1 ? 'rounded-b-2xl' : ''}`}
            onClick={() => handleOptionSelect(option)}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

DropdownBox.propTypes = {
  selectedOption: PropTypes.string.isRequired,
  setSelectedOption: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
  className: PropTypes.string,
};

export default DropdownBox;
