import defaultProfile from '@assets/icons/icon_profile_default_36.svg';
import commentIcon from '@assets/icons/icon_comment_24.svg';
import eyeIcon from '@assets/icons/icon_eye_24.svg';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { getRecentActivity } from '@utils/time';
import { useQuery } from '@tanstack/react-query';
import { getUserListById } from '@queries/getUserListById';

const BoardListItem = ({ postData }) => {
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['post', 'participants', postData.id],
    queryFn: () => {
      console.log('참가자 유저 정보 조회');
      return getUserListById(postData.participants);
    },
    select: (res) => res.data,
    staleTime: 1000 * 10, // 10초 동안 refetch 안 함
  });

  const participantList =
    data &&
    data.slice(0, 4).map((item, index) => {
      return (
        <img
          key={item.id}
          title={item.nickname}
          className={`size-7 object-cover rounded-full ${index !== 0 ? '-ml-2' : ''}`}
          src={item.img_url ? item.img_url : defaultProfile}
        />
      );
    });

  const remainingCount = data && data.length - 4;

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
    participants: PropTypes.array.isRequired,
  }),
};

export default BoardListItem;
