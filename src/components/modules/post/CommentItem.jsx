import profileDefaultIcon from '@assets/icons/icon_profile_default_36.svg';
import PropTypes from 'prop-types';
import SmallDropdownBox from '@components/common/SmallDropdownBox';
import { getRecentActivity } from '@utils/time';

const CommentItem = ({ data }) => {
  return (
    <li className="p-4 ring-2 ring-slate-300 rounded-2xl font-gowunbatang md:text-[1rem] text-sm">
      <div className="flex items-center mb-2">
        <img
          src={data.users?.img_url ? data.users.img_url : profileDefaultIcon}
          className="mr-2 size-9 object-cover rounded-full"
        />
        <p className="font-bold">{data.users?.nickname}</p>
        <div className="ml-auto flex">
          <p className="font-bold text-slate-500 pr-2">
            {getRecentActivity(data.created_at)}
          </p>

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
    users: PropTypes.object.isRequired,
    created_at: PropTypes.string.isRequired,
  }),
};

export default CommentItem;
