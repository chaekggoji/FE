import defaultProfile from '@assets/icons/icon_profile_default_36.svg';
import commentIcon from '@assets/icons/icon_comment_24.svg';
import eyeIcon from '@assets/icons/icon_eye_24.svg';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

const BoardListItem = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div
      className="lg:px-6 px-4 md:min-h-12 py-2 flex items-center border-b-1 border-slate-500 cursor-pointer md:flex-row flex-col md:gap-0 gap-2"
      onClick={() => {
        return navigate(`${post.id}`);
      }}
    >
      <div className="md:flex-3/5 sm:w-full">{post.title}</div>
      <div className="md:flex-2/5 sm:w-full flex text-center justify-end">
        <img
          className="md:flex-1 md:ml-0 ml-4 size-8 flex justify-center items-center"
          src={defaultProfile}
        />
        <div className="md:flex-1 md:ml-0 ml-4 text-center flex justify-center items-center">
          <img src={commentIcon} className="mr-1" />
          <span>4</span>
        </div>
        <div className="md:flex-1 md:ml-0 ml-4 text-center flex justify-center items-center">
          <img src={eyeIcon} className="mr-1" />
          <span>6</span>
        </div>
        <div className="md:flex-1 md:ml-0 ml-4 text-center flex justify-center items-center">
          1일 전
        </div>
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
