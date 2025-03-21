import BoardTitle from '@components/modules/board/BoardTitle';
import StudyMemberListItem from '@components/pages/study/detail/StudyMemberListItem';

const memberList = [
  {
    id: 1,
    nickname: '스터디원1',
  },
  {
    id: 2,
    nickname: '스터디원2',
  },
  {
    id: 3,
    nickname: '스터디원3',
  },
  {
    id: 4,
    nickname: '스터디원4',
  },
  {
    id: 5,
    nickname: '스터디원5',
  },
  {
    id: 6,
    nickname: '스터디원6',
  },
  {
    id: 7,
    nickname: '스터디원7',
  },
  {
    id: 8,
    nickname: '스터디원8',
  },
];

const Manage = () => {
  return (
    <div className="pb-8 lg:mx-0 md:-mx-8 sm:-mx-6">
      <BoardTitle title={'스터디원 관리'} />
      <ul>
        {memberList.map((member) => (
          <StudyMemberListItem key={member.id} memberData={member} />
        ))}
      </ul>
    </div>
  );
};

export default Manage;
