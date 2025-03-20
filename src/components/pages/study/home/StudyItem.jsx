import PropTypes from 'prop-types';

const StudyItem = ({ study, size = 'large', index, totalItems }) => {
  // study가 없을 경우 아무것도 렌더링하지 않음
  if (!study) return null;

  const sizeClass = {
    large: 'w-[380px] h-[550px]',
    medium: 'w-[240px] h-[348px]',
  };

  return (
    <div className={`study-item bg-white rounded-lg shadow-xl ${sizeClass[size]} my-12 ${index === totalItems - 1 ? 'mr-0' : 'mr-4'
      } relative`}> {/* 마지막 카드에서 오른쪽 마진을 없애기 위해 조건 추가 */}
      {/* 썸네일 이미지 */}
      <div className='relative w-full h-[70%] overflow-hidden rounded-t-lg'>
        <img
          src={study.thumbnail || 'https://picsum.photos/120/174'}  // 임시 thumbnail을 사용
          alt={study.title}
          className='w-full h-full object-cover'
        />
        {/* 카테고리 라벨 */}
        <div className='absolute top-2 left-2 bg-primary-300 shadow-2xl text-white px-4 py-1 text-sm rounded-3xl z-10'>
          {study.category || 'ETC'}
        </div>
      </div>

      {/* 텍스트 영역 */}
      <div className='text w-full text-left pl-4 my-8 z-20 relative'>
        <p className='text-3xl m-2'>스터디 명: {study.title || '스터디명 없음'}</p>
        <p className='text-lg m-2'>
          참여 인원: {study.participants || 0} / {study.capacity || 0}
        </p>
        <p className='text-lg m-2'>
          참여 기간: {study.start_date || '시작일 없음'} ~ {study.end_date || '종료일 없음'}
        </p>
      </div>
    </div>
  );
};

StudyItem.propTypes = {
  study: PropTypes.shape({
    title: PropTypes.string.isRequired,
    category: PropTypes.string,
    thumbnail: PropTypes.string,
    participants: PropTypes.number,
    capacity: PropTypes.number,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
  }),
  size: PropTypes.oneOf(['large', 'medium']),  // large, medium 사이즈 옵션
};

export default StudyItem;
