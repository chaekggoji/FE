import Button from '@components/common/Button';
import ProgressBar from '@components/pages/study/create/ProgressBar';
import SearchBook from '@components/pages/study/create/SearchBook';
import StudyForm from '@components/pages/study/create/StudyForm';
import StudyPreview from '@components/pages/study/create/StudyPreview';
import { useState } from 'react';

const Create = () => {
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

  const isStepOneFilled = true;

  const isStepTwoFilled = true;

  return (
    <>
      <div className="my-6 md:my-10 md:mx-auto w-full max-w-[1100px] md:p-15 flex flex-col gap-y-10">
        <ProgressBar
          currentStep={currentStep}
          isStepOneFilled={isStepOneFilled}
          isStepTwoFilled={isStepTwoFilled}
        />
        {currentStep === 0 && <SearchBook />}
        {currentStep === 1 && (
          <StudyForm BookCategoryOption={BookCategoryOption} />
        )}
        {currentStep === 2 && <StudyPreview />}
        <div className="flex justify-between">
          {currentStep === 0 ? (
            <Button size="large" type="CTA Lined">
              취소
            </Button>
          ) : (
            <Button size="large" type="CTA Lined">
              <img src="/src/assets/icons/icon_arrow_left_24.svg" />
              이전
            </Button>
          )}
          {currentStep < 2 ? (
            <Button
              size="large"
              type={
                // step 1, 2의 모든 내용이 입력 완료된 경우에만 버튼 활성화
                (currentStep === 0 && isStepOneFilled) ||
                (currentStep === 1 && isStepTwoFilled)
                  ? 'CTA Abled'
                  : 'CTA Disabled'
              }
            >
              다음
              <img src="/src/assets/icons/icon_arrow_right_24.svg" />
            </Button>
          ) : (
            <Button size="large" type="CTA Abled">
              스터디 생성
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Create;
