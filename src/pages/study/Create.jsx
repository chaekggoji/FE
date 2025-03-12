import Button from '@components/common/Button';
import CustomInputField from '@components/common/CustomInputField';
import CustomTextarea from '@components/common/CustomTextarea';
import { NavLink } from 'react-router';

const Create = () => {
  const BookInfo = [];

  const BookCategoryList = [
    { id: 1, title: '자기계발' },
    { id: 2, title: '인문' },
    { id: 3, title: '경제/경영' },
    { id: 4, title: '처세' },
    { id: 5, title: 'IT' },
    { id: 6, title: '소설' },
    { id: 7, title: '과학' },
    { id: 8, title: '시/에세이' },
    { id: 9, title: '역사/문화' },
    { id: 10, title: '건강' },
    { id: 11, title: '요리' },
  ];

  const BookCategoryOption = BookCategoryList.map((item) => (
    <option id={item.title} key={item.id} value={item.id}>
      {item.title}
    </option>
  ));

  const isStepOne = false;
  const isStepOneFilled = true;

  const isStepTwo = false;
  const isStepTwoFilled = true;

  const isStepThree = true;

  const ProgressBar = () => {
    return (
      <div className="flex justify-center gap-x-10 sm:gap-x-28 relative w-fit mx-auto">
        <NavLink className="text-center flex flex-col items-center gap-2">
          <div
            className={`flex justify-center items-center ${isStepOne || isStepOneFilled ? 'bg-primary-300 text-white' : 'bg-white text-black border-2 border-primary-300'}  w-10 h-10 rounded-full`}
          >
            {isStepOneFilled ? (
              <img src="/src/assets/icons/icon_check_24.svg" />
            ) : (
              '1'
            )}
          </div>
          <p>도서 검색</p>
        </NavLink>
        <NavLink className="text-center flex flex-col items-center gap-2">
          <div
            className={`flex justify-center items-center ${isStepTwo || isStepTwoFilled ? 'bg-primary-300 text-white' : 'bg-white text-black border-2 border-primary-300'}  w-10 h-10 rounded-full`}
          >
            {isStepTwoFilled ? (
              <img src="/src/assets/icons/icon_check_24.svg" />
            ) : (
              '2'
            )}
          </div>
          <p>스터디 정보 입력</p>
        </NavLink>
        <NavLink className="text-center flex flex-col items-center gap-2">
          <div
            className={`flex justify-center items-center ${isStepThree ? 'bg-primary-300 text-white' : 'bg-white text-black border-2 border-primary-300'}  w-10 h-10 rounded-full`}
          >
            3
          </div>
          <p>미리보기</p>
        </NavLink>
        <div className="hidden absolute top-5 w-11/12 h-[2px] bg-primary-300 -z-10 sm:block"></div>
      </div>
    );
  };

  return (
    <>
      <div className="my-6 md:my-10 md:mx-auto w-full max-w-[1100px] md:p-15 flex flex-col gap-y-10">
        <ProgressBar />
        {isStepOne && (
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
        )}
        {isStepTwo && (
          <>
            <form className="flex flex-col gap-y-6 sm:gap-y-10">
              <CustomInputField
                labelText="스터디 이름"
                type="text"
                placeholder="스터디 이름을 입력해주세요."
                id="studyName"
              />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 sm:gap-10">
                <CustomInputField
                  labelText="스터디 시작일"
                  type="date"
                  placeholder="스터디 시작일을 선택해주세요."
                  id="studyStartDate"
                />
                <CustomInputField
                  labelText="스터디 종료일"
                  type="date"
                  placeholder="스터디 종료일을 선택해주세요."
                  id="studyEndDate"
                />
              </div>
              <CustomInputField
                labelText={`스터디 모집 인원`}
                type="number"
                min="1"
                max="8"
                placeholder="참여인원을 입력해주세요."
                id="studyCapacity"
              />
              <div>
                <label
                  htmlFor="bookCategory"
                  className="mb-1 text-gray-400 sm:text-2xl"
                >
                  도서 카테고리
                </label>
                <div className="flex w-full px-6 py-3 border border-gray-200 rounded-xl sm:text-xl has-focus-within:border-primary-300 has-focus-within:shadow has-focus-within:shadow-primary-300">
                  <select
                    id="bookCategory"
                    placeholder="카테고리를 선택해주세요."
                    className="w-full placeholder-gray-500 focus:outline-hidden"
                  >
                    {BookCategoryOption}
                  </select>
                </div>
              </div>
              <CustomTextarea
                labelText="스터디 소개"
                placeholder="스터디 소개를 입력해주세요."
              />
              <CustomTextarea
                labelText="스터디 규칙"
                placeholder="스터디 규칙을 입력해주세요."
              />
            </form>
          </>
        )}
        {isStepThree && (
          <>
            <h1 className="text-4xl">스터디 미리보기</h1>
            <div className="flex flex-col gap-y-6 sm:gap-y-10 sm:border border-gray-200 sm:p-10 rounded-xl">
              <div className="sm:grid grid-cols-3 ">
                <div className="col-start-1 col-end-3 flex flex-col gap-y-6">
                  <hr className="text-gray-200 sm:hidden" />
                  <h2 className="md:text-3xl w-fit mx-auto text-2xl">
                    스터디 정보
                  </h2>
                  <h2 className="text-2xl w-fit mx-auto">스터디 제목</h2>
                  <div className="grid grid-cols-2">
                    <p className="justify-self-center">스터디 제목</p>
                    <p className="justify-self-start">스터디 진행 도서</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p className="justify-self-center">스터디 제목</p>
                    <p className="justify-self-start">스터디 진행 도서</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p className="justify-self-center">스터디 제목</p>
                    <p className="justify-self-start">스터디 진행 도서</p>
                  </div>
                </div>
                <hr className="text-gray-200 sm:hidden" />
                <div className="mx-auto">
                  <h2 className="text-3xl w-fit mx-auto mb-5">도서 정보</h2>
                  <figure className="w-[210px]">
                    <img
                      src="https://picsum.photos/120/160"
                      className="w-full h-full aspect-[7/10] max-w-[210px] object-cover"
                    />
                    <figcaption>
                      <p>책 제목: 다슬이가 괜찮을까요?</p>
                      <p>저자명: 김용희</p>
                    </figcaption>
                  </figure>
                </div>
              </div>
              <hr className="text-gray-200" />
              <div className="mx-auto text-center">
                <h2 className="text-3xl mb-6 sm:mb-10">스터디 소개</h2>
                <p className="whitespace-pre-line">
                  소개소개소개소개소개 소개소개소개소개소개 소개소개소개소개소개
                  소개소개소개소개소개
                </p>
              </div>
              <hr className="text-gray-200" />
              <div className="mx-auto text-center">
                <h2 className="text-3xl mb-6 sm:mb-10">스터디 규칙</h2>
                <p className="whitespace-pre-line">1. 규칙 1. 규칙</p>
              </div>
            </div>
          </>
        )}
        <div className="flex justify-between">
          <Button size="large" type="CTA Lined">
            취소
          </Button>
          <Button
            size="large"
            type={
              isStepOneFilled || isStepTwoFilled || isStepThree
                ? 'CTA Abled'
                : 'CTA Disabled'
            }
          >
            다음
            <img src="/src/assets/icons/icon_arrow_right_24.svg" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Create;
