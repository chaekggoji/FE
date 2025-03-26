import PropTypes from 'prop-types';

const ProgressBar = ({
  currentStep,
  setCurrentStep,
  isBookSelected,
  isStepOneFilled,
}) => {
  return (
    <div className="flex justify-center gap-x-10 sm:gap-x-28 relative w-fit mx-auto">
      <div
        className="text-center flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => {
          setCurrentStep(0);
        }}
      >
        <div className="flex justify-center items-center bg-primary-300 text-white w-10 h-10 rounded-full">
          {currentStep > 0 && isBookSelected ? (
            <img src="/src/assets/icons/icon_check_24.svg" />
          ) : currentStep === 0 && isBookSelected ? (
            <img src="/src/assets/icons/icon_check_24.svg" />
          ) : (
            '1'
          )}
        </div>
        <p className="text-2xl">도서 검색</p>
      </div>
      <div
        className="text-center flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => {
          setCurrentStep(1);
        }}
      >
        <div
          className={`flex justify-center items-center ${currentStep >= 1 ? 'bg-primary-300 text-white' : 'bg-white text-black border-2 border-primary-300'}  w-10 h-10 rounded-full`}
        >
          {isStepOneFilled ? (
            currentStep >= 1 ? (
              <img src="/src/assets/icons/icon_check_24.svg" />
            ) : (
              <img src="/src/assets/icons/icon_check_black_24.svg" />
            )
          ) : (
            '2'
          )}
        </div>
        <p className="text-2xl">스터디 정보 입력</p>
      </div>
      <div
        className="text-center flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => {
          setCurrentStep(2);
        }}
      >
        <div
          className={`flex justify-center items-center ${currentStep === 2 ? 'bg-primary-300 text-white' : 'bg-white text-black border-2 border-primary-300'}  w-10 h-10 rounded-full`}
        >
          3
        </div>
        <p className="text-2xl">미리보기</p>
      </div>
      <div className="hidden absolute top-5 w-11/12 h-[2px] bg-primary-300 -z-10 sm:block"></div>
    </div>
  );
};

ProgressBar.propTypes = {
  currentStep: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
  isBookSelected: PropTypes.bool.isRequired,
  isStepOneFilled: PropTypes.bool.isRequired,
};

export default ProgressBar;
