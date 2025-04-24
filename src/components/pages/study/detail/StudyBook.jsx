import BookItem from '@components/common/BookItem';
import useMediaQuery from '@hooks/useMediaQuery';
import PropTypes from 'prop-types';

const StudyBook = ({ bookData }) => {
  const md = useMediaQuery('(min-width: 768px)');

  return (
    <div className="flex-2/5 flex flex-col items-center md:pt-0 pt-6">
      <h2 className="lg:text-3xl text-2xl mb-5 text-center">도서 정보</h2>
      <BookItem
        size={md ? 'large' : 'medium'}
        title={bookData?.title}
        author={bookData?.author}
        thumbnail={bookData?.thumb_url}
        link={bookData?.url}
      />
    </div>
  );
};

StudyBook.propTypes = {
  bookData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    thumb_url: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default StudyBook;
