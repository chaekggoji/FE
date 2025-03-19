import BookItem from '@components/common/BookItem';
import useMediaQuery from '@hooks/useMediaQuery';
import PropTypes from 'prop-types';

const StudyBook = ({ bookInfo }) => {
  const lg = useMediaQuery('(min-width: 1024px)');

  return (
    <div className="flex-1/2 flex flex-col items-center">
      <h2 className="text-3xl mb-5 text-center">도서 정보</h2>
      <BookItem
        size={lg ? 'large' : 'medium'}
        title={bookInfo.title}
        author={bookInfo.author}
        thumbnail={bookInfo.thumbnail}
        link={bookInfo.url}
      />
    </div>
  );
};

StudyBook.propTypes = {
  bookInfo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default StudyBook;
