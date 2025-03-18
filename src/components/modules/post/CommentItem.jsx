import profileDefaultIcon from '@assets/icons/icon_profile_default_36.svg';
import moreIcon from '@assets/icons/icon_more_24.svg';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import useOutsideClick from '@hooks/useOutsideClick';

const CommentItem = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownBoxRef = useRef();

  useOutsideClick(dropdownBoxRef, () => setIsOpen(false));

  const handleDropdonClck = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <li className="p-4 ring-2 ring-slate-300 rounded-2xl font-gowunbatang">
      <div className="flex items-center mb-2">
        <img src={profileDefaultIcon} className="mr-2" />
        <p className="font-bold">유저 닉네임</p>
        <div className="ml-auto flex relative">
          <p className="font-bold text-slate-500">2시간 전</p>
          <img
            src={moreIcon}
            className="cursor-pointer pl-2"
            onClick={handleDropdonClck}
          />
          {/* 수정, 삭제 모달 */}
          <div
            ref={dropdownBoxRef}
            className={`absolute border-slate-400 border-1 rounded-xl bg-white top-0 right-[24px] opacity-0 transition-all ${isOpen ? 'opacity-100' : 'pointer-events-none'}`}
          >
            <p
              className="py-1 px-3 border-b-1 border-slate-400 cursor-pointer  hover:bg-primary-100 rounded-t-xl"
              onClick={() => setIsOpen(false)}
            >
              수정
            </p>
            <p
              className="py-1 px-3 cursor-pointer hover:bg-primary-100 rounded-b-xl"
              onClick={() => setIsOpen(false)}
            >
              삭제
            </p>
          </div>
        </div>
      </div>
      <p>{data.content}</p>
    </li>
  );
};

CommentItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
  }),
};

export default CommentItem;
