import PropTypes from 'prop-types';

// 스터디 카드(썸네일 이미지, 스터디 정보(제목, 인원, 기간)) - 반응형 스타일
const StudyItem = ({ study, size = 'large' }) => {
  // study가 없을 경우 아무것도 렌더링하지 않음
  if (!study) return null;

  // 부모가 주는 너비만큼 알아서 맞추기
  const sizeClass = {
    large: 'w-full',
    medium: 'w-full',
  };

  const handleStudyClick = (study) => {
    // 버튼을 클릭하면 다른 페이지로 이동
    window.location.href = `/study/${study.id}/home`;
  };

  return (
    <div onClick={() => handleStudyClick(study)} className={`study-item shadow-book rounded-xl ${sizeClass[size]} relative`}>
      <div className='absolute rounded-xl bg-[linear-gradient(90deg,_rgba(95,95,95,0.1)_0%,_rgba(255,255,255,0)_4%)] inset-0 z-5' />
      {/* 썸네일 이미지 */}
      {/* 썸네일 이미지 영역 (상단 5:6 비율 유지) */}
      <div className='relative w-full aspect-[5/6] overflow-hidden rounded-t-lg'>
        <img
          src={study.books?.thumb_url || 'https://picsum.photos/120/174'}
          alt={study.books?.title || '책 이미지'}
          className='w-full h-full object-cover'
        />

        {/* 카테고리 라벨 */}
        {/* 300px 이하에서는 숨기기 */}
        <div className='absolute top-2 left-2 bg-primary-300 shadow-2xl text-white px-2 py-1 text-xs md:text-sm lg:text-base rounded-2xl truncate max-w-[80px] md:max-w-[100px] lg:max-w-[120px]
  z-10 [@media(max-width:300px)]:hidden'
        >
          {study.books?.book_categories?.title || 'ETC'}
        </div>
      </div>

      {/* 텍스트 영역 */}
      <div className='text w-full text-left z-20 relative space-y-1'>
        {/* leadin-snug: 줄 간격은 너무 벌어지지 않도록, tracking-tight: 자간을 조금 좁혀서 정돈된 느낌 주기 */}
        <div className='bg-primary-300 text-white'>
          <p className='truncate text-3xl pl-4 py-3 md:text-2xl lg:text-[1.75rem] leading-snug break-words tracking-tight'>{study.title || '스터디명 없음'}</p>
        </div>
        <p className='truncate text-base px-4 mt-3 md:text-lg lg:text-xl leading-snug break-words text-gray-800'>
          <span className='text-primary-300'>[도서명]</span> {study.books?.title || '제목 없음'}
        </p>
        <p className='truncate text-base px-4 my-2 md:text-lg lg:text-xl leading-snug break-words text-gray-800'>
          <span className='text-primary-300'>[저자]</span> {study.books?.author || '작자 미상'}
        </p>
        <p className='truncate text-base px-4 my-2 md:text-lg lg:text-xl leading-snug break-words text-gray-800'>
          <span className='text-primary-300'>[참여 인원]</span> {study.participantCount} / {study.capacity}
        </p>
        <p className='truncate text-base px-4 mb-3 my-2 md:text-lg lg:text-xl leading-snug break-words text-gray-800'>
          <span className='text-primary-300'>[참여 기간]</span> {study.start_date || '시작일 없음'} ~ {study.end_date || '종료일 없음'}
        </p>
      </div>
    </div>
  );
};

StudyItem.propTypes = {
  study: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    participantCount: PropTypes.number,
    category: PropTypes.string,
    thumb_url: PropTypes.string,
    participants: PropTypes.number,
    capacity: PropTypes.number,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    books: PropTypes.shape({
      thumb_url: PropTypes.string,
      title: PropTypes.string,
      author: PropTypes.string,
      book_categories: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
    book_categories: PropTypes.shape({
      title: PropTypes.string,
    })
  }),
  size: PropTypes.oneOf(['large', 'medium']),  // large, medium 사이즈 옵션
};

export default StudyItem;
