import moreIcon from '@assets/icons/icon_more_24.svg';
import useModalDismiss from '@hooks/useModalDismiss';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

const SmallDropdownBox = ({ onDelete, className }) => {
  const dropdownBoxRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsOpen((prev) => !prev);
  };

  // dropdownBox 외부클릭 시 setIsOpen(false) 실행
  useModalDismiss(dropdownBoxRef, () => setIsOpen(false));

  const handleDelete = () => {
    onDelete();
    setIsOpen(false);
  };
  return (
    <div ref={dropdownBoxRef} className={`relative ${className}`}>
      <img
        src={moreIcon}
        className="cursor-pointer"
        onClick={handleDropdownClick}
      />
      <div
        className={`absolute border-slate-400 border-1 rounded-xl bg-white top-0 right-[24px] opacity-0 transition-all ${isOpen ? 'opacity-100' : 'pointer-events-none'}`}
      >
        {/* <p
          className="py-1 w-14 text-center border-b-1 border-slate-400 cursor-pointer  hover:bg-primary-100 rounded-t-xl"
          onClick={() => setIsOpen(false)}
        >
          수정
        </p> */}
        <p
          className="py-1 w-14 text-center cursor-pointer hover:bg-primary-100 rounded-xl"
          onClick={handleDelete}
        >
          삭제
        </p>
      </div>
    </div>
  );
};

SmallDropdownBox.propTypes = {
  onDelete: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default SmallDropdownBox;
