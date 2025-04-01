import Button from '@components/common/Button';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

const CreateComplete = ({ studyId }) => {
  console.log(studyId);
  const navigate = useNavigate();

  return (
    <>
      <img
        src="/src/assets/images/createComplete.svg"
        alt="스터디 생성 완료"
        className="mx-auto aspect-[16/19] max-w-30 sm:max-w-40 mt-19 md:mt-0"
      />
      <h1 className="mx-auto text-2xl sm:text-4xl">
        스터디가 성공적으로 만들어졌어요! 🤩
      </h1>
      <div className="flex justify-center gap-x-8">
        <Button
          size="large"
          type="CTA Lined"
          onClick={() => {
            navigate('/');
          }}
        >
          메인으로
        </Button>
        <Button
          size="large"
          type="CTA Abled"
          onClick={() => {
            navigate(`/study/${studyId}/home`);
          }}
        >
          스터디로
        </Button>
      </div>
    </>
  );
};

CreateComplete.propTypes = {
  studyId: PropTypes.number,
};

export default CreateComplete;
