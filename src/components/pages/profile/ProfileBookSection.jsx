import Button from '@components/common/Button';
import BookItem from '@components/common/BookItem';
import BookModal from '@components/pages/profile/BookModal';
import { Link } from 'react-router';
import { useState } from 'react';
import PropTypes from 'prop-types';

const ProfileBookSection = ({ userId, booksList }) => {
  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기 함수
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-3/4 max-w-5xl min-w-[20.4375rem] mx-auto py-5 px-10 bg-white rounded-xl flex flex-col gap-5">
      {/* 나의 독서 현황 */}
      <div className="w-full border-gray-200 border-2 rounded-lg p-5 shadow-sm mt-10 mx-auto">
        <h3 className="text-3xl font-bold mb-4 pb-2 border-b border-gray-100">
          나의 도서 현황
        </h3>
        <div className="grid grid-cols-3 gap-2.5">
          <Link to={`/profile/${userId}/books`}>
            <button className="w-full flex items-center justify-center gap-2.5 text-xl rounded-lg bg-secondary-100 p-3 py-2.5 transition-all hover:bg-secondary-200 hover:shadow-md cursor-pointer">
              전체
              <span className="bg-white px-3 py-0.5 rounded-full font-medium shadow-inner">
                16
              </span>
            </button>
          </Link>
          <Link to={`/profile/${userId}/books`}>
            <button className="w-full flex items-center justify-center gap-2.5 text-xl rounded-lg bg-primary-100 p-3 py-2.5 transition-all hover:bg-primary-200 hover:shadow-md cursor-pointer">
              진행중
              <span className="bg-white px-3 py-0.5 rounded-full font-medium shadow-inner">
                4
              </span>
            </button>
          </Link>
          <Link to={`/profile/${userId}/books`}>
            <button className="w-full flex items-center justify-center gap-2.5 text-xl rounded-lg bg-gray-100 p-3 py-2.5 transition-all hover:bg-gray-200 hover:shadow-md cursor-pointer">
              완료
              <span className="bg-white px-3 py-0.5 rounded-full font-medium shadow-inner">
                12
              </span>
            </button>
          </Link>
        </div>
      </div>

      <h2 className="text-3xl text-center p-5">최근 도서</h2>

      {/* 도서 카드 */}
      <div className="flex flex-wrap justify-between gap-7.5">
        {booksList.map((book) => (
          <BookItem
            key={book.id}
            size="large"
            title={book.title}
            author={book.author}
            thumbnail={book.thumbnail}
            link={book.link}
            onClick={() => handleOpenModal()}
          ></BookItem>
        ))}
      </div>

      <BookModal isOpen={isModalOpen} onRequestClose={handleCloseModal} />

      <div className="self-end py-5">
        <Link to={`/profile/${userId}/books`}>
          <Button>모두 보기</Button>
        </Link>
      </div>
    </div>
  );
};

ProfileBookSection.propTypes = {
  userId: PropTypes.number.isRequired,
  booksList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      thumbnail: PropTypes.string,
      link: PropTypes.string,
    }),
  ).isRequired,
};

export default ProfileBookSection;
