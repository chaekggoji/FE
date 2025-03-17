import CustomInputField from '@components/common/CustomInputField';
import CustomTextarea from '@components/common/CustomTextarea';
import PropTypes from 'prop-types';

const StudyForm = ({ BookCategoryOption }) => {
  console.log(BookCategoryOption);

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
  );
};

StudyForm.propTypes = {
  BookCategoryOption: PropTypes.object,
};

export default StudyForm;
