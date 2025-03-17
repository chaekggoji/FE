import Button from '@components/common/Button';
import CustomInputField from '@components/common/CustomInputField';
import CustomTextarea from '@components/common/CustomTextarea';
import ProgressBar from '@components/pages/study/create/ProgressBar';
import StudyBook from '@components/pages/study/detail/StudyBook';
import StudyInfo from '@components/pages/study/detail/StudyInfo';
import StudyIntro from '@components/pages/study/detail/StudyIntro';
import StudyRules from '@components/pages/study/detail/StudyRules';
import { useState } from 'react';

const Create = () => {
  const book = {
    title: '신의 아이들은 모두 춤춘다',
    author: '무라카미 하루키',
    thumbnail:
      'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6771279%3Ftimestamp%3D20250108153124',
    url: 'https://search.daum.net/search?w=bookpage&bookId=6771279&q=%EC%8B%A0%EC%9D%98+%EC%95%84%EC%9D%B4%EB%93%A4%EC%9D%80+%EB%AA%A8%EB%91%90+%EC%B6%A4%EC%B6%98%EB%8B%A4',
  };

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

  const [currentStep, setCurrentStep] = useState(2);

  const isStepOneFilled = false;

  const isStepTwoFilled = false;

  return (
    <>
      <div className="my-6 md:my-10 md:mx-auto w-full max-w-[1100px] md:p-15 flex flex-col gap-y-10">
        <ProgressBar
          currentStep={currentStep}
          isStepOneFilled={isStepOneFilled}
          isStepTwoFilled={isStepTwoFilled}
        />
        {currentStep === 0 && (
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
        {currentStep === 1 && (
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
        {currentStep === 2 && (
          <>
            <h1 className="text-4xl">스터디 미리보기</h1>
            <div className="flex flex-col gap-y-6 sm:gap-y-10 sm:border border-gray-200 sm:p-10 rounded-xl">
              <div className="px-24 flex py-12 border-b-1 border-slate-200">
                <StudyInfo />
                <StudyBook bookInfo={book} />
              </div>
              <StudyIntro />
              <StudyRules />
            </div>
          </>
        )}
        <div className="flex justify-between">
          <Button size="large" type="CTA Lined">
            취소
          </Button>
          <Button size="large" type="CTA Lined">
            <img src="/src/assets/icons/icon_arrow_left_24.svg" />
            이전
          </Button>
          <Button
            size="large"
            type={
              isStepOneFilled || isStepTwoFilled ? 'CTA Abled' : 'CTA Disabled'
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
