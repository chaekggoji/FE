import Button from '@components/common/Button';
import { NavLink } from 'react-router';

const Create = () => {
  const BookInfo = [];

  return (
    <>
      <div className="my-20 mx-auto w-full max-w-[1100px] p-15 flex flex-col gap-y-10">
        <div className="flex justify-center gap-x-28 relative w-fit mx-auto">
          <NavLink className="text-center flex flex-col items-center gap-2">
            <div className="flex justify-center items-center bg-primary-300 text-white w-10 h-10 rounded-full">
              1
            </div>
            <p>도서 검색</p>
          </NavLink>
          <NavLink className="text-center flex flex-col items-center gap-2">
            <div className="flex justify-center items-center bg-primary-300 text-white w-10 h-10 rounded-full">
              2
            </div>
            <p>스터디 정보 입력</p>
          </NavLink>
          <NavLink className="text-center flex flex-col items-center gap-2">
            <div className="flex justify-center items-center bg-primary-300 text-white w-10 h-10 rounded-full">
              3
            </div>
            <p>미리보기</p>
          </NavLink>
          <div className="absolute top-5 w-11/12 h-[2px] bg-gray-400 -z-10"></div>
        </div>
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
