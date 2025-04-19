import defaultProfileImage from '@assets/icons/icon_no_profile_24.svg';
import Button from '@components/common/Button';
import ProfileCategoryTag from '@components/pages/profile/ProfileCategoryTag';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

const ProfileHeader = ({ user }) => {
  return (
    <div className="w-3/4 max-w-5xl min-w-[20.4375rem] mx-auto p-10 bg-white rounded-2xl">
      {/* 이미지 및 간단한 프로필 */}
      <div className="flex items-center gap-2.5">
        {/* 이미지 */}
        <div
          className={`aspect-square lg:w-36 md:w-28 sm:w-20 ${
            user.img_url ? 'p-3' : ''
          }`}
        >
          <img
            src={user.img_url || defaultProfileImage}
            alt="프로필 이미지"
            className="object-cover block w-full h-full rounded-full"
            // 이미지 로딩 실패했을 때
            onError={(e) => {
              // 무한 반복 방지 - 기본 이미지도 깨질 경우 onError가 무한 반복되는 걸 방지하기 위해, 한 번 실행 후 onError 핸들러를 제거해줌
              e.target.onerror = null;
              // 기본 이미지로 교체
              e.target.src = defaultProfileImage;
            }}
          />
        </div>
        {/* 간단한 프로필 */}
        <div className="grow">
          <h1 className="lg:text-4xl">{user.nickname} 님</h1>
          <p className="mt-2 lg:text-2xl text-gray-500">{user.intro}</p>
          <div className="-mx-1 mt-1 flex items-center gap-1.5 text-primary-400">
            {user.categories.map((category) => (
              <ProfileCategoryTag key={category} text={category} />
            ))}
          </div>
        </div>
      </div>

      {/* 프로필 - 내 정보 수정, 로그아웃 버튼 */}
      <div className="flex justify-end gap-2.5">
        <Link to={`/profile/${user.id}/edit`}>
          <Button>내 정보 수정</Button>
        </Link>
        <Link to="/">
          <Button type="CTA Lined">로그아웃</Button>
        </Link>
      </div>
    </div>
  );
};

ProfileHeader.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
    intro: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    img_url: PropTypes.string,
  }).isRequired,
};
export default ProfileHeader;
