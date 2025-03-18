import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

const StudyMembers = ({ memberList }) => {
  const navigate = useNavigate();
  return (
    <div className="flex cursor-pointer">
      {memberList.map((member) => {
        return (
          <div
            key={member.id}
            className={`bg-slate-200 border-1 border-black rounded-full relative group size-12 -mr-2`}
            title={member.nickname ? member.nickname : '탈퇴한 사용자'}
            onClick={() => navigate(`/profile/${member.id}`)}
          />
        );
      })}
    </div>
  );
};

StudyMembers.propTypes = {
  memberList: PropTypes.array.isRequired,
};

export default StudyMembers;
