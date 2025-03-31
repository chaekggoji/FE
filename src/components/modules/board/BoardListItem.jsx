import defaultProfile from '@assets/icons/icon_profile_default_36.svg';
import commentIcon from '@assets/icons/icon_comment_24.svg';
import eyeIcon from '@assets/icons/icon_eye_24.svg';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { getRecentActivity } from '@utils/time';
import supabase from '@libs/supabase';
import { useQueryClient } from '@tanstack/react-query';

const BoardListItem = ({ postData }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const participantList =
    postData &&
    postData.post_participants.slice(0, 4).map((participant, index) => {
      return (
        <img
          key={participant.users.id}
          title={participant.users.nickname}
          className={`size-7 object-cover rounded-full ${index !== 0 ? '-ml-2' : ''}`}
          src={
            participant.users.img_url
              ? participant.users.img_url
              : defaultProfile
          }
        />
      );
    });

  const remainingCount = postData && postData.post_participants.length - 4;

  const handleClick = async () => {
    const { error } = await supabase.rpc('increment_post_view', {
      post_id: postData.id,
    });

    if (error) {
      console.error('조회수 증가 실패:', error);
      return;
    }
    queryClient.invalidateQueries(['posts', postData.type]);
    navigate(`${postData.id}`);
  };

  return (
    <div
      className="lg:px-6 px-4 md:min-h-12 py-2 flex items-center border-b-1 border-slate-500 cursor-pointer md:flex-row flex-col md:gap-0 gap-2"
      onClick={handleClick}
    >
      <div className="md:flex-3/5 sm:w-full">{postData.title}</div>
      <div className="md:flex-2/5 sm:w-full flex md:gap-0 gap-4 text-center justify-end">
        <div className="md:flex-1 md:ml-0 flex justify-center items-center">
          {participantList}
          {remainingCount > 0 && (
            <div
              className="size-7 shrink-0 flex items-center justify-center rounded-full bg-gray-200 text-xs text-gray-600 font-medium -ml-2"
              title={`외 ${remainingCount}명`}
            >
              +{remainingCount}
            </div>
          )}
        </div>
        <div className="md:flex-1 md:ml-0 text-center flex justify-center items-center">
          <img src={commentIcon} className="mr-1" />
          <span>{postData.comment_count}</span>
        </div>
        <div className="md:flex-1 md:ml-0 text-center flex justify-center items-center">
          <img src={eyeIcon} className="mr-1" />
          <span>{postData.views}</span>
        </div>
        <div className="md:flex-1 md:ml-0 text-center flex justify-center items-center">
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
    comment_count: PropTypes.number.isRequired,
    views: PropTypes.number.isRequired,
    recent_activity: PropTypes.string.isRequired,
    post_participants: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
  }),
};

export default BoardListItem;
