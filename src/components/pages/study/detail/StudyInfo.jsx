import Button from '@components/common/Button';
import MemberList from '@components/common/MemberList';

const StudyInfo = () => {
  return (
    <div className="flex-1/2 flex flex-col gap-4">
      <h2 className="text-3xl mb-4 text-center">스터디 정보</h2>
      <h3 className="text-3xl">무라카미 하루키 신작 같이 읽어요!</h3>
      <div className="flex">
        <div className="flex-1/3 flex flex-col gap-4 text-2xl">
          <p>스터디 진행 도서</p>
          <p>스터디 일정</p>
          <p>모집 인원</p>
        </div>
        <div className="flex-2/3 flex flex-col gap-4 text-2xl">
          <p>신의 아이들은 모두 춤춘다</p>
          <p>2025-04-01 ~ 2025-04-30</p>
          <p>8명</p>
        </div>
      </div>
      <div>
        <p className="text-2xl mb-4">현재 스터디원</p>
        <MemberList
          memberList={[
            { id: 1, nickname: '오동환' },
            { id: 2, nickname: '오다슬' },
            { id: 3, nickname: '이선재' },
            { id: 4, nickname: '강지훈' },
            { id: 5, nickname: '황은지' },
            { id: 6, nickname: null },
          ]}
        />
      </div>
      <div className="ml-auto">
        <Button onClick={() => window.alert('스터디에 참여하였습니다.')}>
          스터디 참여하기
        </Button>
      </div>
    </div>
  );
};

export default StudyInfo;
