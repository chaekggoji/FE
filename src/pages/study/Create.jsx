import Button from '@components/common/Button';
import CreateComplete from '@components/pages/study/create/CreateComplete';
import ProgressBar from '@components/pages/study/create/ProgressBar';
import SearchBook from '@components/pages/study/create/SearchBook';
import StudyForm from '@components/pages/study/create/StudyForm';
import StudyPreview from '@components/pages/study/create/StudyPreview';
import { useState } from 'react';

const Create = () => {
  // 현재 작성 중인 step 상태로 지정
  const [currentStep, setCurrentStep] = useState(0);

  // 전체 작성 완료 상태
  const [isComplete, setIsComplete] = useState(false);

  // step 1에서 도서 선택이 완료된 경우, true 로 지정
  const isStepZeroFilled = false;

  // step 2의 모든 입력란 입력이 완료된 경우, true 로 지정
  const isStepOneFilled = false;

  const isStepFilled =
    (currentStep === 0 && isStepZeroFilled) ||
    (currentStep === 1 && isStepOneFilled);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleCancelCreate = () => {
    alert('스터디 생성 취소');
  };

  const handleSaveStudy = () => {
    setIsComplete(!isComplete);
  };

  return (
    <>
      <div className="my-6 md:my-10 md:mx-auto w-full max-w-[1100px] md:p-15 flex flex-col gap-y-10">
        {!isComplete ? (
          <>
            <ProgressBar
              currentStep={currentStep}
              isStepZeroFilled={isStepZeroFilled}
              isStepOneFilled={isStepOneFilled}
              setCurrentStep={setCurrentStep}
            />
            {currentStep === 0 && <SearchBook />}
            {currentStep === 1 && <StudyForm />}
            {currentStep === 2 && <StudyPreview />}
            <div className="flex justify-between">
              {currentStep === 0 ? (
                <Button
                  size="large"
                  type="CTA Lined"
                  onClick={handleCancelCreate}
                >
                  취소
                </Button>
              ) : (
                <Button
                  size="large"
                  type="CTA Lined"
                  onClick={handlePreviousStep}
                >
                  <img src="/src/assets/icons/icon_arrow_left_24.svg" />
                  이전
                </Button>
              )}
              {currentStep < 2 ? (
                <Button
                  size="large"
                  type={
                    // step 1, 2의 모든 내용이 입력 완료된 경우에만 버튼 활성화
                    isStepFilled ? 'CTA Abled' : 'CTA Disabled'
                  }
                  onClick={isStepFilled ? handleNextStep : null}
                >
                  다음
                  <img src="/src/assets/icons/icon_arrow_right_24.svg" />
                </Button>
              ) : (
                <Button size="large" type="CTA Abled" onClick={handleSaveStudy}>
                  스터디 생성
                </Button>
              )}
            </div>
          </>
        ) : (
          <CreateComplete />
        )}
      </div>
    </>
  );
};

export default Create;
