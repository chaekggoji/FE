import BoardListItem from '@components/modules/board/BoardListItem';

const BoardList = () => {
  return (
    <div className="font-gowunbatang min-h-[calc(100vh-264px)]">
      <div className="border-[#835F45] border-b-1 border-t-1  text-[#835F45]">
        <div className=" px-6 h-12 flex items-center">
          <div className="flex-8 text-center">제목</div>
          <div className="flex-1 text-center">참여자</div>
          <div className="flex-1 text-center">댓글</div>
          <div className="flex-1 text-center">조회수</div>
          <div className="flex-1 text-center">최근 활동</div>
        </div>
      </div>
      <BoardListItem />
    </div>
  );
};

export default BoardList;
