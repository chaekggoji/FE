import BoardTitle from '@components/modules/board/BoardTitle';
import StudyMemberListItem from '@components/pages/study/detail/StudyMemberListItem';
import { deleteStudyMember } from '@queries/study/deleteStudyMember';
import { getStudyMemberList } from '@queries/study/getStudyMemberList';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';

const Manage = () => {
  const queryClient = useQueryClient();
  const { studyId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['members', studyId],
    queryFn: () => getStudyMemberList(studyId),
    select: (res) => res.data,
  });

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

  console.log(data);
  return (
    <div className="pb-8 lg:mx-0 md:-mx-8 sm:-mx-6">
      <BoardTitle title={'스터디원 관리'} />
      <ul>
        {!isLoading &&
          data.map((member) => (
            <StudyMemberListItem
              key={member.users.id}
              memberData={member.users}
              onDelete={() =>
                mutation.mutate({ userId: member.users.id, studyId })
              }
            />
          ))}
      </ul>
    </div>
  );
};

export default Manage;
