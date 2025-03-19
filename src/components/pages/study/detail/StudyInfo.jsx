import Button from '@components/common/Button';
import MemberList from '@components/pages/study/detail/MemberList';
import useMediaQuery from '@hooks/useMediaQuery';

const StudyInfo = () => {
  // 반응형 버튼 제작을 위한 커스텀 훅 사용
  const lg = useMediaQuery('(min-width: 1024px)');

  return (
    <div className="flex-3/5 flex flex-col gap-4">
      <h2 className="lg:text-3xl text-2xl mb-4 text-center">스터디 정보</h2>
      <h3 className="lg:text-3xl text-2xl">
        무라카미 하루키 신작 같이 읽어요!
      </h3>
      <div className="flex">
        <div className="flex-1/3 flex flex-col gap-4 lg:text-2xl text-xl">
          <p>스터디 진행 도서</p>
          <p>스터디 일정</p>
          <p>모집 인원</p>
        </div>
        <div className="flex-2/3 flex flex-col gap-4 lg:text-2xl text-xl">
          <p>신의 아이들은 모두 춤춘다</p>
          <p>2025-04-01 ~ 2025-04-30</p>
          <p>8명</p>
        </div>
      </div>
      <div>
        <p className="lg:text-2xl text-xl mb-4">현재 스터디원</p>
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
      <Button
        size={lg ? 'medium' : 'small'}
        className="ml-auto"
        onClick={() => window.alert('스터디에 참여하였습니다.')}
      >
        스터디 참여하기
      </Button>
    </div>
  );
};

export default StudyInfo;
