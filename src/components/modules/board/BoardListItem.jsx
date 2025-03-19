import profileDefaultIcon from '@assets/icons/icon_profile_default_36.svg';
import commentIcon from '@assets/icons/icon_comment_24.svg';
import eyeIcon from '@assets/icons/icon_eye_24.svg';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

const BoardListItem = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div
      className="px-6 h-16 flex items-center border-b-1 border-slate-500 cursor-pointer"
      onClick={() => {
        return navigate(`${post.id}`);
      }}
    >
      <div className="flex-8">{post.title}</div>
      <div className="flex-1 text-center flex justify-center items-center">
        <img src={profileDefaultIcon} />
      </div>
      <div className="flex-1 text-center flex justify-center items-center">
        <img src={commentIcon} className="mr-1" />
        <span>4</span>
      </div>
      <div className="flex-1 text-center flex justify-center items-center">
        <img src={eyeIcon} className="mr-1" />
        <span>6</span>
      </div>
      <div className="flex-1 text-center flex justify-center items-center">
        1일 전
      </div>
    </div>
  );
};

BoardListItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),
};

export default BoardListItem;
