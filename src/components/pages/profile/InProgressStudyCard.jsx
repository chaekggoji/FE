import Person from '@assets/icons/icon_no_profile_24.svg';
import bookIcon from '@assets/icons/icon_book_24.svg';
import studyPeriodIcon from '@assets/icons/icon_calendar_24.svg';
import { Link } from 'react-router';

const InProgressStudyCard = () => {
  return (
    <Link to="/study/1/home">
      <div className="p-2.5 border-2 border-primary-200 rounded-lg shadow-[0px_3px_3px_0px_rgba(0,0,0,0.15)]">
        {/* 스터디 상태 표시 */}
        <div className="px-2 py-2">
          <span className="bg-primary-200 text-white px-2.5 py-1 rounded-2xl text-xl">
            진행중
          </span>
        </div>
        {/* 스터디 제목 */}
        <h3 className="px-3 py-2 text-2xl truncate">미움받을 용기 북살롱</h3>
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
            <span className="truncate text-right">미움 받을 용기</span>
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
            <span className="truncate text-right">2025.02.25 ~ 2025.03.25</span>
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
            <span className="text-right">6 명</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default InProgressStudyCard;
