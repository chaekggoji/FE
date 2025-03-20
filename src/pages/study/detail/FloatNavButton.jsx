import barIcon from '@assets/icons/icon_bar_white_24.svg';
import useModalDismiss from '@hooks/useModalDismiss';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';

const FloatNavButton = ({ pages }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownBoxRef = useRef();
  const navigate = useNavigate();

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDropdownClick = (route) => {
    navigate(route);
    setIsOpen(false);
  };

  useModalDismiss(dropdownBoxRef, () => setIsOpen(false));
  return (
    <div
      className="absolute left-0 top-[24px] lg:hidden z-10"
      ref={dropdownBoxRef}
    >
      <div
        className="size-12 bg-primary-200 rounded-full flex justify-center items-center cursor-pointer shadow-float-button hover:bg-primary-300"
        onClick={handleToggleDropdown}
      >
        <img src={barIcon} className="size-6" />
      </div>
      <div
        className={`absolute border-slate-400 border-1 rounded-xl bg-white top-[56px] left-0  transition-all opacity-0 ${isOpen ? 'opacity-100' : 'pointer-events-none'}`}
      >
        {pages.map((page, index) => (
          <p
            key={index}
            className={`py-1 w-24 text-center border-slate-400 cursor-pointer  hover:bg-primary-100 ${index === 0 ? 'rounded-t-xl border-b-1' : index === pages.length - 1 ? 'rounded-b-xl' : 'border-b-1'}`}
            onClick={() => handleDropdownClick(page.route)}
          >
            {page.title}
          </p>
        ))}
      </div>
    </div>
  );
};

FloatNavButton.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
};

export default FloatNavButton;
