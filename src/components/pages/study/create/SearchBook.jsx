import SearchField from '@components/common/SearchField';
import { useRef, useState } from 'react';

const SearchBook = () => {
  const [isSelected, setIsSelected] = useState(false);

  // input 란의 값을 useRef 로 추출
  const searchKeyword = useRef(null);

  // ref 에 해당하는 input 의 value 를 추출, 함수 실행
  const handleSearch = () => {
    console.log(searchKeyword.current.value);
  };

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
      <ul className="flex flex-col gap-y-10">
        <li
          className={`flex gap-x-5 sm:gap-x-10 items-center p-4 sm:p-8 border ${isSelected ? 'border-primary-300 bg-primary-100' : 'border-gray-200 bg-white'} rounded-xl cursor-pointer`}
          onClick={() => setIsSelected(!isSelected)}
        >
          <img
            className="w-full h-full aspect-[7/10] max-w-[112px] object-cover"
            src="https://picsum.photos/120/160"
          />
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl">도서 제목</h2>
            <p className="text-xl text-gray-500">저자 | 출판사</p>
            <p className="text-xl text-gray-500">도서 정보</p>
          </div>
        </li>
      </ul>
    </>
  );
};

export default SearchBook;
