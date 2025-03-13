import PropTypes from 'prop-types';

const BookItem = ({
  size = 'medium',
  title,
  author,
  thumbnail = null,
  link = null,
  className,
  ...props
}) => {
  const sizeClass = {
    // 카카오 API 제공 썸네일 크기 : 120x174
    large: 'w-[240px] h-[348px]',
    medium: 'w-[120px] h-[174px]',
  }[size];

  const captionHeightClass = size === 'medium' ? 'h-[40px]' : 'h-[80px]';

  const captionFontSizeClass = size === 'medium' ? 'text-xs' : '';

  return (
    <>
      <div
        className={`rounded-tr-2xl rounded-br-2xl relative shadow-book cursor-pointer ${sizeClass} ${className}`}
        onClick={() => {
          link
            ? window.open(link, '_blank')
            : window.alert('상세 정보가 제공되지 않는 도서입니다.');
        }}
        {...props}
      >
        <img
          src={thumbnail ? thumbnail : 'https://picsum.photos/120/174'}
          className="w-full h-full object-cover rounded-tr-2xl rounded-br-2xl"
        />
        <div
          className={`w-full bg-white rounded-br-2xl absolute left-0 bottom-0 flex flex-col justify-center p-4 ${captionHeightClass} ${captionFontSizeClass}`}
        >
          <p className="mr-auto">{title}</p>
          <p className="ml-auto">by {author}</p>
        </div>
      </div>
    </>
  );
};

BookItem.propTypes = {
  size: PropTypes.oneOf(['large', 'medium']),
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  link: PropTypes.string,
  className: PropTypes.string,
};

export default BookItem;
