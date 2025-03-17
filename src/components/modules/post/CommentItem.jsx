import profileDefaultIcon from '@assets/icons/icon_profile_default_36.svg';
import PropTypes from 'prop-types';

// Todo
// 수정, 삭제

const CommentItem = ({ data }) => {
  return (
    <li className="p-4 ring-2 ring-slate-300 rounded-2xl font-gowunbatang">
      <div className="flex items-center mb-2">
        <img src={profileDefaultIcon} className="mr-2" />
        <p className="font-bold">유저 닉네임</p>
        <p className="font-bold ml-auto text-slate-500">2시간 전</p>
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
