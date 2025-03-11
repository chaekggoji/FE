import Button from '@components/common/Button';

const StudyInfo = () => {
  return (
    <div className="flex-1/2 flex flex-col gap-4">
      <h2 className="text-3xl mb-4 text-center">스터디 정보</h2>
      <h3 className="text-3xl">다슬이는 괜찮아요!</h3>
      <div className="flex">
        <div className="flex-1/3 flex flex-col gap-4 text-2xl">
          <p>스터디 진행 도서</p>
          <p>스터디 일정</p>
          <p>모집 인원</p>
        </div>
        <div className="flex-2/3 flex flex-col gap-4 text-2xl">
          <p>다슬이가 괜찮을까요?</p>
          <p>2025-02-06 ~ 2025-03-05</p>
          <p>8명</p>
        </div>
      </div>
      <div>
        <p className="text-2xl mb-4">현재 스터디원</p>
        <div className="flex cursor-pointer">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
            <div
              key={index}
              className="bg-slate-200 border-1 border-black rounded-full size-12 -mr-2"
            />
          ))}
        </div>
      </div>
      <div className="ml-auto">
        <Button>스터디 참여하기</Button>
      </div>
    </div>
  );
};

export default StudyInfo;
