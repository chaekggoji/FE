import defaultProfile from '@assets/icons/icon_profile_default_36.svg';
import commentIcon from '@assets/icons/icon_comment_24.svg';
import eyeIcon from '@assets/icons/icon_eye_24.svg';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { getRecentActivity } from '@utils/time';

const BoardListItem = ({ postData }) => {
  const navigate = useNavigate();

  return (
    <div
      className="lg:px-6 px-4 md:min-h-12 py-2 flex items-center border-b-1 border-slate-500 cursor-pointer md:flex-row flex-col md:gap-0 gap-2"
      onClick={() => {
        return navigate(`${postData.id}`);
      }}
    >
      <div className="md:flex-3/5 sm:w-full">{postData.title}</div>
      <div className="md:flex-2/5 sm:w-full flex text-center justify-end">
        <div className="md:flex-1 md:ml-0 ml-4 flex justify-center items-center">
          <img
            className="size-7 object-cover rounded-full"
            src={
              postData.users?.img_url ? postData.users.img_url : defaultProfile
            }
          />
        </div>
        <div className="md:flex-1 md:ml-0 ml-4 text-center flex justify-center items-center">
          <img src={commentIcon} className="mr-1" />
          <span>{postData.comment_count}</span>
        </div>
        <div className="md:flex-1 md:ml-0 ml-4 text-center flex justify-center items-center">
          <img src={eyeIcon} className="mr-1" />
          <span>{postData.views}</span>
        </div>
        <div className="md:flex-1 md:ml-0 ml-4 text-center flex justify-center items-center">
          {getRecentActivity(postData.recent_activity)}
        </div>
      </div>
    </div>
  );
};

BoardListItem.propTypes = {
  postData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    users: PropTypes.object.isRequired,
    comment_count: PropTypes.number.isRequired,
    views: PropTypes.number.isRequired,
    recent_activity: PropTypes.string.isRequired,
  }),
};

export default BoardListItem;
