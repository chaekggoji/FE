import PropTypes from 'prop-types';
import { NavLink } from 'react-router';

const ProgressBar = ({
  currentStep,
  setCurrentStep,
  isStepOneFilled,
  isStepTwoFilled,
}) => {
  return (
    <div className="flex justify-center gap-x-10 sm:gap-x-28 relative w-fit mx-auto">
      <NavLink
        className="text-center flex flex-col items-center gap-2"
        onClick={() => {
          setCurrentStep(0);
        }}
      >
        <div className="flex justify-center items-center bg-primary-300 text-white w-10 h-10 rounded-full">
          {isStepOneFilled ? (
            <img src="/src/assets/icons/icon_check_24.svg" />
          ) : (
            '1'
          )}
        </div>
        <p>도서 검색</p>
      </NavLink>
      <NavLink
        className="text-center flex flex-col items-center gap-2"
        onClick={() => {
          setCurrentStep(1);
        }}
      >
        <div
          className={`flex justify-center items-center ${currentStep >= 1 ? 'bg-primary-300 text-white' : 'bg-white text-black border-2 border-primary-300'}  w-10 h-10 rounded-full`}
        >
          {isStepTwoFilled ? (
            <img src="/src/assets/icons/icon_check_24.svg" />
          ) : (
            '2'
          )}
        </div>
        <p>스터디 정보 입력</p>
      </NavLink>
      <NavLink
        className="text-center flex flex-col items-center gap-2"
        onClick={() => {
          setCurrentStep(2);
        }}
      >
        <div
          className={`flex justify-center items-center ${currentStep === 2 ? 'bg-primary-300 text-white' : 'bg-white text-black border-2 border-primary-300'}  w-10 h-10 rounded-full`}
        >
          3
        </div>
        <p>미리보기</p>
      </NavLink>
      <div className="hidden absolute top-5 w-11/12 h-[2px] bg-primary-300 -z-10 sm:block"></div>
    </div>
  );
};

ProgressBar.propTypes = {
  currentStep: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
  isStepOneFilled: PropTypes.bool.isRequired,
  isStepTwoFilled: PropTypes.bool.isRequired,
};

export default ProgressBar;
