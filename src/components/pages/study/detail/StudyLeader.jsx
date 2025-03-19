import defaultProfile from '@assets/icons/icon_profile_default_36.svg';
import Button from '@components/common/Button';
import useMediaQuery from '@hooks/useMediaQuery';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

const StudyLeader = ({ userId, profileURL, nickname, intro, className }) => {
  const lg = useMediaQuery('(min-width: 1024px)');

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/profile/${userId}`);
  };
  return (
    <div
      className={`px-24 w-full flex lg:justify-start justify-center items-center gap-6 lg:min-h-[104px] min-h[64px] border-b-1 border-slate-200 ${className} lg:cursor-auto cursor-pointer`}
      onClick={lg ? null : handleNavigate}
    >
      <img
        className="lg:size-16 size-12"
        src={profileURL ? profileURL : defaultProfile}
      />
      <div className="py-2">
        <h4 className="text-xl lg:mr-0 mr-5">스터디 리더 : {nickname}</h4>
        <p className="text-gray-500">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste, iure
          fugiat officiis labore nulla deleniti laboriosam non cumque?
          Doloremque repudiandae aliquam in repellat dignissimos enim omnis ea
          asperiores similique accusamus?
        </p>
      </div>
      <div className="ml-auto hidden lg:block shrink-0">
        <Button className="" onClick={handleNavigate}>
          프로필 보기
        </Button>
      </div>
    </div>
  );
};

export default StudyLeader;

StudyLeader.propTypes = {
  userId: PropTypes.number.isRequired,
  profileURL: PropTypes.string,
  nickname: PropTypes.string.isRequired,
  intro: PropTypes.string.isRequired,
  className: PropTypes.string,
};
