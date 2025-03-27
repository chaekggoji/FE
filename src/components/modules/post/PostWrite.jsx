import Button from '@components/common/Button';
import BoardTitle from '@components/modules/board/BoardTitle';
import { writePost } from '@queries/post/writePost';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

// 임시 유저
const userId = 1;

const title = {
  notice: '공지사항 글 작성',
  debate: '토론 글 작성',
};

const titlePlaceholder = {
  notice: '공지사항 제목을 입력해주세요.',
  debate: '함께 토론하고 싶은 주제를 입력해 주세요.',
};

const contentPlaceholder = {
  notice: '공지사항 내용을 입력해주세요.',
  debate: '토론 주제에 대한 내용을 입력해 주세요.',
};

const PostWrite = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { studyId, boardType } = useParams();
  const { register, handleSubmit } = useForm();

  const mutation = useMutation({
    mutationFn: ({ studyId, userId, type, title, content }) => {
      return writePost(studyId, userId, type, title, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts', boardType]);
      window.alert('게시글을 작성하였습니다.');
      navigate(-1, { replace: true });
    },
    onError: (error) => {
      console.log(error.message);
      window.alert('게시글 작성 중 오류가 발생했습니다.');
      navigate(-1, { replace: true });
    },
  });

  const handleWrite = async (studyId, userId, type, title, content) => {
    mutation.mutate({ studyId, userId, type, title, content });
  };

  const handleCancle = (event) => {
    event.preventDefault();
    alert('글 작성이 취소되었습니다.');
    navigate(-1, { replace: true });
  };

  const onSubmit = (formData) => {
    handleWrite(studyId, userId, boardType, formData.title, formData.content);
  };

  return (
    <div className="pb-8 lg:mx-0 md:-mx-8 sm:-mx-6">
      <BoardTitle title={title[boardType]} />
      <form
        className="flex flex-col gap-4 items-center mt-4 max-w-[1000px] mx-auto lg:px-10 md:px-8 sm:px-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="w-full ring-2 ring-slate-300 focus:outline-none focus:ring-primary-400 rounded-2xl px-4 py-3"
          type="text"
          placeholder={titlePlaceholder[boardType]}
          {...register('title')}
        />
        <textarea
          className="w-full ring-2 ring-slate-300 focus:outline-none focus:ring-primary-400 rounded-2xl resize-none px-4 py-3 min-h-[360px]"
          placeholder={contentPlaceholder[boardType]}
          {...register('content')}
        />
        <div className="flex ml-auto gap-4">
          <Button type="CTA Lined" onClick={handleCancle}>
            취소
          </Button>
          <Button>저장</Button>
        </div>
      </form>
    </div>
  );
};

export default PostWrite;
