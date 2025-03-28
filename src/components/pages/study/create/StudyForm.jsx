import CustomInputField from '@components/common/CustomInputField';
import CustomTextarea from '@components/common/CustomTextarea';
import CategoryDropdown from '@components/pages/study/create/CategoryDropdown';
import PropTypes from 'prop-types';

const StudyForm = ({
  studyForm,
  setStudyForm,
  categoryValue,
  setCategoryValue,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudyForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="flex flex-col gap-y-6 sm:gap-y-10">
      <CustomInputField
        labelText="스터디 이름"
        type="text"
        placeholder="스터디 이름을 입력해주세요."
        id="studyName"
        name="title"
        value={studyForm?.title || null}
        onblur={handleChange}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 sm:gap-10">
        <CustomInputField
          labelText="스터디 시작일"
          type="date"
          placeholder="스터디 시작일을 선택해주세요."
          id="studyStartDate"
          name="start_date"
          value={studyForm?.start_date || null}
          onblur={handleChange}
        />
        <CustomInputField
          labelText="스터디 종료일"
          type="date"
          placeholder="스터디 종료일을 선택해주세요."
          id="studyEndDate"
          name="end_date"
          value={studyForm?.end_date || null}
          onblur={handleChange}
        />
      </div>
      <CustomInputField
        labelText={`스터디 모집 인원`}
        type="number"
        min="1"
        max="8"
        placeholder="참여인원을 입력해주세요."
        id="studyCapacity"
        name="capacity"
        value={studyForm?.capacity || null}
        onblur={handleChange}
      />
      <CategoryDropdown
        categoryValue={categoryValue}
        setCategoryValue={setCategoryValue}
      />
      <CustomTextarea
        labelText="스터디 소개"
        placeholder="스터디 소개를 입력해주세요."
        id="studyInfo"
        name="description"
        value={studyForm?.description || null}
        onblur={handleChange}
      />
      <CustomTextarea
        labelText="스터디 규칙"
        placeholder="스터디 규칙을 입력해주세요."
        id="studyRule"
        name="rule"
        value={studyForm?.rule || null}
        onblur={handleChange}
      />
      <button
        type="button"
        onClick={() => {
          console.log(studyForm);
        }}
      >
        상태 테스트
      </button>
    </form>
  );
};

StudyForm.propTypes = {
  studyForm: PropTypes.object,
  setStudyForm: PropTypes.func,
  categoryValue: PropTypes.object,
  setCategoryValue: PropTypes.func,
};

export default StudyForm;
