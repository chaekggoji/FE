const SearchBook = () => {
  return (
    <>
      <input type="text" placeholder="검색어를 입력해주세요." />
      <h1 className="text-4xl">검색 결과</h1>
      <ul className="flex flex-col gap-y-10">
        <li className="flex gap-x-10 items-center p-8 border border-gray-200 rounded-xl">
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
