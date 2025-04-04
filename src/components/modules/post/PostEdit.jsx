import Button from '@components/common/Button';
import BoardTitle from '@components/modules/board/BoardTitle';
import useMediaQuery from '@hooks/useMediaQuery';
import { editPost } from '@queries/posts';
import useUserStore from '@store/useUserStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router';

const title = {
  notice: '공지사항 글 수정',
  debate: '토론 글 수정',
};

const PostEdit = () => {
  const loggedInUserId = useUserStore((state) => state.loggedInUser.id);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { boardType } = useParams();
  const { register, handleSubmit } = useForm();
  const location = useLocation();
  const md = useMediaQuery('(min-width: 768px)');

  // 리팩토링 목록
  // - 텍스트 에디터 사용
  // - 사진 등록

  const mutation = useMutation({
    mutationFn: ({ title, content }) => {
      return editPost(location.state.postId, loggedInUserId, title, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['post', location.state.postId]);
      window.alert('게시글을 수정하였습니다.');
      navigate(-1, { replace: true });
    },
    onError: (error) => {
      console.log(error.message);
      window.alert('게시글 수정 중 오류가 발생했습니다.');
      navigate(-1, { replace: true });
    },
  });

  const handleCancle = (event) => {
    event.preventDefault();
    alert('글 수정이 취소되었습니다.');
    navigate(-1, { replace: true });
  };

  const onSubmit = (formData) => {
    mutation.mutate({ title: formData.title, content: formData.content });
  };

  return (
    <div className="pb-8 lg:mx-0 md:-mx-8 sm:-mx-6">
      <BoardTitle title={title[boardType]} />
      <form
        className="flex flex-col gap-4 items-center mt-4 max-w-[1000px] mx-auto lg:px-10 md:px-8 sm:px-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="w-full ring-2 ring-slate-300 focus:outline-none focus:ring-primary-400 rounded-2xl px-4 py-3 font-gowunbatang"
          type="text"
          {...register('title')}
          defaultValue={location.state.title}
        />
        <textarea
          className="w-full ring-2 ring-slate-300 focus:outline-none focus:ring-primary-400 rounded-2xl resize-none px-4 py-3 min-h-[360px] font-gowunbatang"
          {...register('content')}
          defaultValue={location.state.content}
        />
        <div className="flex ml-auto gap-4">
          <Button
            size={md ? 'medium' : 'small'}
            type="CTA Lined"
            onClick={handleCancle}
          >
            취소
          </Button>
          <Button size={md ? 'medium' : 'small'}>저장</Button>
        </div>
      </form>
    </div>
  );
};

export default PostEdit;
