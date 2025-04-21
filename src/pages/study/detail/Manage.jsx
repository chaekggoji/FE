import BoardTitle from '@components/modules/board/BoardTitle';
import StudyMemberListItem from '@components/pages/study/detail/StudyMemberListItem';
import NoResults from '@pages/error/NoResults';
import { deleteStudyMember } from '@queries/study';
import useUserStore from '@store/useUserStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router';

// 리팩토링 목록
// 403, 404 에러 페이지 연결

const Manage = () => {
  const loggedInUserId = useUserStore((state) => state.loggedInUser.id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { studyId } = useParams();
  const { memberList } = useOutletContext();

  const mutation = useMutation({
    mutationFn: ({ userId, studyId }) => {
      return deleteStudyMember(userId, studyId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(['members', studyId]);
      window.alert('정상적으로 스터디 멤버를 내보냈습니다.');
    },

    onError: (error) => {
      console.log(error.message);
      window.alert('멤버를 내보내는 중 오류가 발생했습니다.');
    },
  });

  useEffect(() => {
    const isLeader = memberList?.some((member) => {
      return member.users.id === loggedInUserId && member.role === 'leader';
    });

    if (!isLeader) {
      navigate('/403', { replace: true });
    }
  }, [memberList]);

  return (
    <div className="lg:mx-0 md:-mx-8 sm:-mx-6">
      <BoardTitle title={'스터디원 관리'} />
      {memberList.length === 1 ? (
        <NoResults message={'스터디원이 존재하지 않습니다.'} />
      ) : (
        <ul className="pb-8">
          {memberList?.slice(1).map((member) => (
            <StudyMemberListItem
              key={member.users.id}
              memberData={member.users}
              onDelete={() =>
                mutation.mutate({ userId: member.users.id, studyId })
              }
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Manage;
