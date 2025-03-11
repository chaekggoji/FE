import Button from '@components/common/Button';

const Create = () => {
  const BookInfo = [];

  return (
    <>
      <div className="my-20 mx-auto w-full max-w-[1100px] p-15 flex flex-col gap-y-10">
        <div className="h-20 bg-gray-400">page navigation</div>
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
        <div className="flex justify-between">
          <Button size="large" type="CTA Lined">
            취소
          </Button>
          <Button size="large">
            다음
            <img src="/src/assets/icons/icon_arrow_right_24.svg" />
          </Button>
        </div>

        <input placeholder="placeholder" />
      </div>
    </>
  );
};

export default Create;
