import SearchField from '@components/common/SearchField';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;

const SearchBook = ({ bookList, setBookList }) => {
  const [isSelected, setIsSelected] = useState(false);

  // input 란의 값을 useRef 로 추출
  const searchKeyword = useRef(null);

  // ref 에 해당하는 input 의 value 를 추출, 함수 실행
  const handleSearch = async () => {
    console.log(searchKeyword.current.value);
    try {
      const response = await fetch(
        `https://dapi.kakao.com/v3/search/book?query=${searchKeyword.current.value}&sort=accuracy`,
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
      } else {
        console.log('검색 결과 없음');
      }
    } catch {}
  };

  console.log(bookList);

  const bookSearchResults = bookList?.map((item) => (
    <li
      key={item.isbn}
      className={`flex gap-x-5 sm:gap-x-10 items-center p-4 sm:p-8 border ${isSelected ? 'border-primary-300 bg-primary-100' : 'border-gray-200 bg-white'} rounded-xl cursor-pointer`}
      onClick={() => setIsSelected(!isSelected)}
    >
      <img
        className="w-full h-full aspect-[7/10] max-w-[112px] object-cover"
        src={item.thumbnail}
      />
      <div className="flex flex-col gap-8">
        <h2 className="text-3xl line-clamp-1">{item.title}</h2>
        <p className="text-xl text-gray-500">
          {item.authors} | {item.publisher}
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
      <ul className="flex flex-col gap-y-10">{bookSearchResults}</ul>
    </>
  );
};

SearchBook.propTypes = {
  bookList: PropTypes.object,
  setBookList: PropTypes.func,
};

export default SearchBook;
