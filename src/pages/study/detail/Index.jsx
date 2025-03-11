import profileImg from '@assets/icons/icon_no_profile_24.svg';
import Button from '@components/common/Button';

const StudyDetailHome = () => {
  return (
    <div>
      <div className="bg-amber-200 w-full">
        <img className="size-16" src={profileImg} />
        <div></div>
        <Button>프로필 보기</Button>
      </div>
    </div>
  );
};

export default StudyDetailHome;
