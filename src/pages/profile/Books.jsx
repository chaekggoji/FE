import BookItem from '@components/common/BookItem';
import Pagination from '@components/common/Pagination';
import SortDropdown from '@components/pages/study/home/SortDropdown';
import BookModal from '@components/pages/profile/BookModal';
import { STATUS_FILTER } from '@/constants/bookSearch';
import { useState } from 'react';

const Books = () => {
  // 모달 상태 관리 추가
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기 함수
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const booksList = [
    {
      id: 1,
      title: '소년이 온다',
      author: '한강',
    },
    {
      id: 2,
      title:
        '2025 큰별쌤 최태성의 별별한국사 한국사능력검정시험 심화(1,2,3급) 상',
      author: '최태성',
    },
    {
      id: 3,
      title: '어제보다 멍청해지기 전에',
      author: '필립 길버트 해머튼',
    },
    {
      id: 4,
      title: '행동하지 않으면 인생은 바뀌지 않는다',
      author: '브라이언 트레이시',
    },
    {
      id: 5,
      title: 'The Wild Robot #1 : The Wild Robot (미국판)',
      author: '피터 브라운',
    },
    {
      id: 6,
      title:
        "Tuesdays with Morrie: an Old Man, a Young Man, and Life's Greatest Lesson",
      author: '미치 앨봄 와르르르르르르르르르르르르르르르르르르르르르르',
    },
    {
      id: 7,
      title: '아몬드',
      author: '손원평',
    },
    {
      id: 8,
      title: '해리 포터와 마법사의 돌',
      author: 'J.K. 롤링',
    },
    {
      id: 9,
      title: '사피엔스: 유인원에서 사이보그까지, 인간 역사의 대담한 질문',
      author: '유발 하라리',
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState('all');
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <div className="lg:p-20 md:p-16 sm:p-10">
      <div className="w-3/4 max-w-5xl min-w-[20.4375rem] mx-auto p-10 bg-white rounded-2xl flex flex-col">
        <h2 className="text-3xl text-center py-7.5">도서 목록</h2>
        <div className="flex justify-end mb-7.5">
          <SortDropdown
            sort={sort}
            setSort={setSort}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            sortOptions={STATUS_FILTER}
            buttonClassName="bg-primary-200 text-white border-primary-300"
            menuClassName="border-primary-300"
            itemClassName="rounded-none hover:text-white"
            widthClass="w-30"
          />
        </div>
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
        <div className="py-7.5">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Books;
