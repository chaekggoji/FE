import CustomInputField from '@components/common/CustomInputField';
import CustomTextarea from '@components/common/CustomTextarea';
import CategoryDropdown from '@components/pages/study/create/CategoryDropdown';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

const StudyForm = ({ studyForm, setStudyForm }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});

  return (
    <form className="flex flex-col gap-y-6 sm:gap-y-10">
      <CustomInputField
        labelText="스터디 이름"
        type="text"
        placeholder="스터디 이름을 입력해주세요."
        id="studyName"
        register={
          (register('title'),
          {
            required: '스터디 이름을 입력해주세요.',
          })
        }
        error={errors.title}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 sm:gap-10">
        <CustomInputField
          labelText="스터디 시작일"
          type="date"
          placeholder="스터디 시작일을 선택해주세요."
          id="studyStartDate"
          register={
            (register('start_date'),
            {
              required: '스터디 시작일을 선택해주세요.',
            })
          }
          error={errors.start_date}
        />
        <CustomInputField
          labelText="스터디 종료일"
          type="date"
          placeholder="스터디 종료일을 선택해주세요."
          id="studyEndDate"
          register={
            (register('end_date'),
            {
              required: '스터디 종료일을 선택해주세요.',
            })
          }
          error={errors.end_date}
        />
      </div>
      <CustomInputField
        labelText={`스터디 모집 인원`}
        type="number"
        min="1"
        max="8"
        placeholder="참여인원을 입력해주세요."
        id="studyCapacity"
        register={
          (register('capacity'),
          {
            required: '스터디 참여 인원을 입력해주세요.',
          })
        }
        error={errors.capacity}
      />
      <CategoryDropdown />
      <CustomTextarea
        labelText="스터디 소개"
        placeholder="스터디 소개를 입력해주세요."
        register={
          (register('description'),
          {
            required: '스터디 소개를 입력해주세요.',
          })
        }
        error={errors.description}
      />
      <CustomTextarea
        labelText="스터디 규칙"
        placeholder="스터디 규칙을 입력해주세요."
        register={
          (register('rule'),
          {
            required: '스터디 규칙을 입력해주세요.',
          })
        }
        error={errors.description}
      />
    </form>
  );
};

StudyForm.propTypes = {
  BookCategoryOption: PropTypes.object,
};

export default StudyForm;
