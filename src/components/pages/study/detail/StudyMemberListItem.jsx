import defaultProfile from '@assets/icons/icon_no_profile_24.svg';
import Button from '@components/common/Button';
import PropTypes from 'prop-types';

const StudyMemberListItem = ({ memberData }) => {
  const handleKick = () => {
    const ok = window.confirm('정말로 해당 멤버를 내보내시겠습니까?');
    if (ok) {
      // 멤버 내보내기
    }
  };
  return (
    <li className="flex items-center px-6 border-b-1 border-slate-400 h-16">
      <div className="flex items-center">
        <img src={defaultProfile} className="size-12" />
        <p>{memberData.nickname}</p>
      </div>
      <Button type="CTA Delete" className="ml-auto" onClick={handleKick}>
        내보내기
      </Button>
    </li>
  );
};

StudyMemberListItem.propTypes = {
  memberData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nickname: PropTypes.string,
  }),
};

export default StudyMemberListItem;
