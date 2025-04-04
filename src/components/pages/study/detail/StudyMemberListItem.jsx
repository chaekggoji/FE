import defaultProfile from '@assets/icons/icon_profile_default_36.svg';
import Button from '@components/common/Button';
import useMediaQuery from '@hooks/useMediaQuery';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

const StudyMemberListItem = ({ memberData, onDelete }) => {
  const md = useMediaQuery('(min-width: 768px)');
  const navigate = useNavigate();

  const handleKick = () => {
    const ok = window.confirm('정말로 해당 멤버를 내보내시겠습니까?');
    if (ok) {
      // 멤버 내보내기
      onDelete();
    }
  };
  return (
    <li className="flex items-center px-6 border-b-1 border-slate-400 h-16">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate(`/profile/${memberData.id}`)}
      >
        <img
          src={memberData.img_url ? memberData.img_url : defaultProfile}
          className="size-10 mr-4 rounded-full object-cover"
        />
        <p>{memberData.nickname}</p>
      </div>
      <Button
        size={md ? 'medium' : 'small'}
        type="CTA Delete"
        className="ml-auto"
        onClick={handleKick}
      >
        내보내기
      </Button>
    </li>
  );
};

StudyMemberListItem.propTypes = {
  memberData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nickname: PropTypes.string,
    img_url: PropTypes.string,
  }),
  onDelete: PropTypes.func.isRequired,
};

export default StudyMemberListItem;
