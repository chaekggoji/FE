import Button from '@components/common/Button';
import BoardTitle from '@components/modules/board/BoardTitle';
import { useForm } from 'react-hook-form';
import { replace, useNavigate, useParams } from 'react-router';

const title = {
  notices: '공지사항 글 작성',
  debates: '토론 글 작성',
};

const titlePlaceholder = {
  notices: '공지사항 제목을 입력해주세요.',
  debates: '함께 토론하고 싶은 주제를 입력해 주세요.',
};

const contentPlaceholder = {
  notices: '공지사항 내용을 입력해주세요.',
  debates: '토론 주제에 대한 내용을 입력해 주세요.',
};

const PostWrite = () => {
  const navigate = useNavigate();
  const { boardType } = useParams();
  const { register, handleSubmit } = useForm();

  const handleCancle = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <div>
      <BoardTitle title={title[boardType]} />
      <form
        className="px-24 flex flex-col gap-4 items-center mt-4 max-w-[1000px] mx-auto"
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
