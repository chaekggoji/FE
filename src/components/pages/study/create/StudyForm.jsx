import CustomInputField from '@components/common/CustomInputField';
import CustomTextarea from '@components/common/CustomTextarea';
import CategoryDropdown from '@components/pages/study/create/CategoryDropdown';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const StudyForm = ({
  studyForm,
  setStudyForm,
  categoryValue,
  setCategoryValue,
}) => {
  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange', // 입력할 때마다 유효성 검사 수행
  });

  // 모든 필드 값 실시간 감지
  const formData = watch();

  // 모든 필드가 유효할 때만 setStudyForm 호출
  useEffect(() => {
    if (isValid && JSON.stringify(studyForm) !== JSON.stringify(formData)) {
      setStudyForm(formData);
    }
  }, [formData, isValid, setStudyForm]);

  return (
    <form className="flex flex-col gap-y-6 sm:gap-y-10">
      <CustomInputField
        labelText="스터디 이름"
        type="text"
        placeholder="스터디 이름을 입력해주세요."
        id="studyName"
        name="title"
        value={studyForm?.title || ''}
        register={register('title', {
          required: '스터디 제목을 입력해주세요.',
          pattern: {
            value: /^.{3,30}$/,
            message: '스터디 제목은 최소 3자, 최대 30자까지 작성 가능해요.',
          },
        })}
        error={errors}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 sm:gap-10">
        <CustomInputField
          labelText="스터디 시작일"
          type="date"
          placeholder="스터디 시작일을 선택해주세요."
          id="studyStartDate"
          value={studyForm?.start_date || ''}
          register={register('start_date', {
            required: '스터디 시작일을 선택해주세요.',
          })}
          error={errors}
        />
        <CustomInputField
          labelText="스터디 종료일"
          type="date"
          placeholder="스터디 종료일을 선택해주세요."
          id="studyEndDate"
          value={studyForm?.end_date || ''}
          register={register('end_date', {
            required: '스터디 종료일을 선택해주세요.',
          })}
          error={errors}
        />
      </div>
      <CustomInputField
        labelText={`스터디 모집 인원`}
        type="number"
        min="1"
        max="8"
        placeholder="참여인원을 입력해주세요."
        id="studyCapacity"
        value={studyForm?.capacity || ''}
        register={register('capacity', {
          required: '스터디 참여 인원을 선택해주세요.',
          pattern: {
            value: /^[1-8]$/,
            message:
              '스터디 참여 인원은 스터디장 포함 최소 1명, 최대 8명까지만 선택할 수 있어요.',
          },
        })}
        error={errors}
      />
      <CategoryDropdown
        categoryValue={categoryValue}
        setCategoryValue={setCategoryValue}
      />
      <CustomTextarea
        labelText="스터디 소개"
        placeholder="스터디 소개를 입력해주세요."
        id="studyInfo"
        value={studyForm?.description || ''}
        register={register('description', {
          required: '스터디 소개를 입력해주세요.',
          pattern: {
            value: /^[\s\S]{10,}$/,
            message: '최소 10자 이상 소개글을 적어주세요.',
          },
        })}
        error={errors}
      />
      <CustomTextarea
        labelText="스터디 규칙"
        placeholder="스터디 규칙을 입력해주세요."
        id="studyRule"
        value={studyForm?.rule || ''}
        register={register('rule', {
          required: '스터디 규칙을 입력해주세요.',
          pattern: {
            value: /^[\s\S]{10,}$/,
            message: '최소 10자 이상 규칙을 적어주세요.',
          },
        })}
        error={errors}
      />
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
