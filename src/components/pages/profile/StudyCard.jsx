import PropTypes from 'prop-types';
import Person from '@assets/icons/icon_no_profile_24.svg';
import bookIcon from '@assets/icons/icon_book_24.svg';
import studyPeriodIcon from '@assets/icons/icon_calendar_24.svg';
import { Link } from 'react-router';

const StudyCard = ({ study }) => {
  const { id, title, bookTitle, startDate, endDate, participantCount, status } =
    study;

  // status prop에 따라 다른 디자인 적용
  const isInProgress = status === 'inProgress';

  if (isInProgress) {
    // 진행 중인 스터디 카드 (InProgressStudyCard와 동일)
    return (
      <Link to={`/study/${id}/home`}>
        <div className="p-2.5 border-2 border-primary-200 rounded-lg shadow-[0px_3px_3px_0px_rgba(0,0,0,0.15)]">
          {/* 스터디 상태 표시 */}
          <div className="px-2 py-2">
            <span className="bg-primary-200 text-white px-2.5 py-1 rounded-2xl text-xl">
              진행중
            </span>
          </div>
          {/* 스터디 제목 */}
          <h3 className="px-3 py-2 text-2xl truncate">{title}</h3>
          {/* 스터디 정보 */}
          <div className="px-2 space-y-1 mb-2">
            {/* 스터디 정보 - 도서명 */}
            <div className="flex justify-between items-center gap-1">
              <div className="flex gap-1 items-center flex-shrink-0">
                <img
                  className="w-6 aspect-square"
                  src={bookIcon}
                  alt="도서명 아이콘"
                />
                <span>도서명</span>
              </div>
              <span className="truncate text-right">{bookTitle}</span>
            </div>
            {/* 스터디 정보 - 스터디 기간 */}
            <div className="flex justify-between items-center">
              <div className="flex gap-1 items-center">
                <img
                  className="w-6 aspect-square"
                  src={studyPeriodIcon}
                  alt="스터디 기간 아이콘"
                />
                <span>스터디 기간</span>
              </div>
              <span className="truncate text-right">
                {startDate} ~ {endDate}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-1 items-center">
                <img
                  className="w-6 aspect-square"
                  src={Person}
                  alt="참여 인원 아이콘"
                />
                <span>참여 인원</span>
              </div>
              <span className="text-right">{participantCount} 명</span>
            </div>
          </div>
        </div>
      </Link>
    );
  } else {
    // 완료된 스터디 카드 (CompletedStudyCard와 동일)
    return (
      <Link to={`/study/${id}/home`}>
        <div className="p-2.5 rounded-lg shadow-[0px_3px_3px_0px_rgba(0,0,0,0.15)] bg-gray-100 text-gray-500">
          {/* 스터디 상태 표시 */}
          <div className="px-2 py-2">
            <span className="border-primary-200 text-primary-200 border-2 px-2.5 py-0.5 rounded-2xl text-xl bg-white">
              완료
            </span>
          </div>
          {/* 스터디 제목 */}
          <h3 className="px-3 py-2 text-2xl truncate">{title}</h3>
          {/* 스터디 정보 */}
          <div className="px-2 space-y-1 mb-2">
            {/* 스터디 정보 - 도서명 */}
            <div className="flex justify-between items-center gap-1">
              <div className="flex gap-1 items-center flex-shrink-0">
                <img
                  className="w-6 aspect-square"
                  src={bookIcon}
                  alt="도서명 아이콘"
                />
                <span>도서명</span>
              </div>
              <span className="truncate text-right">{bookTitle}</span>
            </div>
            {/* 스터디 정보 - 스터디 기간 */}
            <div className="flex justify-between items-center">
              <div className="flex gap-1 items-center">
                <img
                  className="w-6 aspect-square"
                  src={studyPeriodIcon}
                  alt="스터디 기간 아이콘"
                />
                <span>스터디 기간</span>
              </div>
              <span className="truncate text-right">
                {startDate} ~ {endDate}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-1 items-center">
                <img
                  className="w-6 aspect-square"
                  src={Person}
                  alt="참여 인원 아이콘"
                />
                <span>참여 인원</span>
              </div>
              <span className="text-right">{participantCount} 명</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
};

StudyCard.propTypes = {
  study: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    bookTitle: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    participantCount: PropTypes.number.isRequired,
    status: PropTypes.oneOf(['inProgress', 'completed']).isRequired,
  }).isRequired,
};

export default StudyCard;
