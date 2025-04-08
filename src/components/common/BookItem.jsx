import PropTypes from 'prop-types';
import bookCoverPlaceholder from '@assets/images/book_cover_placeholder.jpg';
const BookItem = ({
  size = 'medium',
  title,
  author,
  thumbnail = null,
  link = null,
  onClick = null,
  showCaption = true,
  className,
  ...props
}) => {
  const sizeClass = {
    // 카카오 API 제공 썸네일 크기 : 120x174
    large: 'w-[240px] h-[348px]',
    medium: 'w-[180px] h-[261px]',
    small: 'w-[120px] h-[174px]',
  }[size];

  const captionClass = {
    large: 'h-[80px] text-lg p-4',
    medium: 'h-[60px] text-base p-2',
    small: 'h-[40px] text-xs p-2',
  }[size];

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (link) {
      window.open(link, '_blank');
    } else {
      window.alert('상세 정보가 제공되지 않는 도서입니다.');
    }
  };

  return (
    <>
      <div
        className={`rounded-tr-2xl rounded-br-2xl relative shadow-book cursor-pointer ${sizeClass} ${className}`}
        onClick={handleClick}
        {...props}
      >
        <img
          src={thumbnail ? thumbnail : bookCoverPlaceholder}
          className="w-full h-full object-cover rounded-tr-2xl rounded-br-2xl"
          alt={title}
        />
        {showCaption && (
          <div
            className={`w-full bg-white rounded-br-2xl absolute left-0 bottom-0 flex flex-col justify-center ${captionClass}`}
          >
            <p className="mr-auto w-full truncate">{title}</p>
            <p className="ml-auto text-end w-full truncate">by {author}</p>
          </div>
        )}
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
  onClick: PropTypes.func,
  showCaption: PropTypes.bool,
};

export default BookItem;
