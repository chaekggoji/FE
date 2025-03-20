import profileDefaultIcon from '@assets/icons/icon_profile_default_36.svg';
import PropTypes from 'prop-types';
import SmallDropdownBox from '@components/common/SmallDropdownBox';

const CommentItem = ({ data }) => {
  return (
    <li className="p-4 ring-2 ring-slate-300 rounded-2xl font-gowunbatang md:text-[1rem] text-sm">
      <div className="flex items-center mb-2">
        <img src={profileDefaultIcon} className="mr-2" />
        <p className="font-bold">유저 닉네임</p>
        <div className="ml-auto flex">
          <p className="font-bold text-slate-500 pr-2">2시간 전</p>

          {/* 수정, 삭제 모달 */}
          <SmallDropdownBox />
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
