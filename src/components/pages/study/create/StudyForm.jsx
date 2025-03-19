import CustomInputField from '@components/common/CustomInputField';
import CustomTextarea from '@components/common/CustomTextarea';
import CategoryDropdown from '@components/pages/study/create/CategoryDropdown';
import PropTypes from 'prop-types';

const StudyForm = () => {
  return (
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
      <CategoryDropdown />
      <CustomTextarea
        labelText="스터디 소개"
        placeholder="스터디 소개를 입력해주세요."
      />
      <CustomTextarea
        labelText="스터디 규칙"
        placeholder="스터디 규칙을 입력해주세요."
      />
    </form>
  );
};

StudyForm.propTypes = {
  BookCategoryOption: PropTypes.object,
};

export default StudyForm;
