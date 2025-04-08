import InProgressStudyCard from '@components/pages/profile/InProgressStudyCard';
import CompletedStudyCard from '@components/pages/profile/CompletedStudyCard';
import PropTypes from 'prop-types';

const StudyCardList = ({ limit }) => {
  // 스터디 데이터
  const studies = [
    { id: 1, type: 'inProgress' },
    { id: 2, type: 'inProgress' },
    { id: 3, type: 'completed' },
    { id: 4, type: 'completed' },
    { id: 5, type: 'completed' },
    { id: 6, type: 'completed' },
    { id: 7, type: 'completed' },
    { id: 8, type: 'completed' },
    { id: 9, type: 'completed' },
    { id: 10, type: 'completed' },
    { id: 11, type: 'completed' },
    { id: 12, type: 'completed' },
  ];

  // 화면에 표시 할 스터디 카드의 목록
  const displayStudiesList = limit ? studies.slice(0, limit) : studies;

  return (
    // 스터디 카드
    <div className="grid lg:grid-cols-2 gap-5">
      {displayStudiesList.map((study) =>
        study.type === 'inProgress' ? (
          <InProgressStudyCard key={study.id} />
        ) : (
          <CompletedStudyCard key={study.id} />
        ),
      )}
    </div>
  );
};

StudyCardList.propTypes = {
  limit: PropTypes.number,
};

export default StudyCardList;
