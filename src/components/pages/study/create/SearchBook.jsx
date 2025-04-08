import Pagination from '@components/common/Pagination';
import SearchField from '@components/common/SearchField';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;

const SearchBook = ({
  isBookSelected,
  setIsBookSelected,
  bookList,
  setBookList,
}) => {
  // input 란의 값을 useRef 로 추출
  const searchKeyword = useRef(null);

  // 현재 페이지
  const [currentPage, setCurrentPage] = useState(1);

  const handleBookSelect = (item) => {
    if (isBookSelected && isBookSelected.isbn === item.isbn) {
      setIsBookSelected(null);
      return;
    }

    setIsBookSelected({
      title: item.title,
      author: item.authors,
      publisher: item.publisher,
      isbn: item.isbn,
      description: item.contents,
      url: item.url,
      thumb_url: item.thumbnail,
    });
  };

  // ref 에 해당하는 input 의 value 를 추출, 함수 실행
  const handleSearch = async (currentPage) => {
    try {
      const response = await fetch(
        `https://dapi.kakao.com/v3/search/book?query=${searchKeyword.current.value}&sort=accuracy&page=${currentPage}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `KakaoAK ${KAKAO_API_KEY}`,
          },
        },
      );
      if (response.ok) {
        const bookSearchResults = await response.json();
        setBookList(bookSearchResults.documents);
      }
    } catch {
      alert('잠시 후 다시 검색해 주세요.');
    }
  };

  const bookSearchResults = bookList?.map((item) => (
    <li
      key={item.isbn}
      className={`flex gap-x-5 sm:gap-x-10 items-center p-4 sm:p-8 border ${item.isbn === isBookSelected?.isbn ? 'border-primary-300 bg-primary-100' : 'border-gray-200 bg-white'} rounded-xl cursor-pointer`}
      onClick={() => {
        handleBookSelect(item);
      }}
    >
      <img
        className="w-full h-full aspect-[7/10] max-w-[112px] object-cover"
        src={
          item.thumbnail
            ? item.thumbnail
            : '/src/assets/images/book_cover_placeholder.jpg'
        }
      />
      <div className="flex flex-col gap-8">
        <h2 className="text-3xl line-clamp-1">{item.title}</h2>
        <p className="text-xl text-gray-500">
          {item.authors.length > 1 ? item.authors.join(', ') : item.authors} |{' '}
          {item.publisher}
        </p>
        <p className="text-xl text-gray-500 line-clamp-1">{item.contents}</p>
      </div>
    </li>
  ));

  // Enter key 이벤트 추가
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <SearchField
        placeholder="검색어를 입력해주세요."
        searchKeyword={searchKeyword}
        onClick={handleSearch}
        onKeyDown={handleEnter}
      />
      <h1 className="text-4xl">검색 결과</h1>
      {bookList?.length !== 0 ? (
        <>
          <ul className="flex flex-col gap-y-10">{bookSearchResults}</ul>
          {bookList && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      ) : (
        <div className="flex flex-col gap-y-10">
          <img
            src="/src/assets/images/error.png"
            alt="도서 검색 결과가 없습니다."
            className="mx-auto max-w-30 sm:max-w-40 mt-19 md:mt-0"
          />
          <h1 className="mx-auto text-2xl sm:text-4xl">
            검색어와 일치하는 책을 찾지 못했어요 😭
          </h1>
        </div>
      )}
    </>
  );
};

SearchBook.propTypes = {
  isBookSelected: PropTypes.object,
  setIsBookSelected: PropTypes.func,
  bookList: PropTypes.object,
  setBookList: PropTypes.object,
};

export default SearchBook;
