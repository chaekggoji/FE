import Button from '@components/common/Button';
import BoardTitle from '@components/modules/board/BoardTitle';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router';

const title = {
  notices: '공지사항 글 수정',
  debates: '토론 글 수정',
};

const PostEdit = () => {
  const navigate = useNavigate();
  const { boardType } = useParams();
  const { register, handleSubmit } = useForm();
  const location = useLocation();

  const handleCancle = (event) => {
    event.preventDefault();
    alert('글 수정이 취소되었습니다.');
    navigate(-1, { replace: true });
  };

  const onSubmit = (formData) => {
    window.alert('글이 수정되었습니다.');
    console.log(formData);
  };

  return (
    <div className="pb-16">
      <BoardTitle title={title[boardType]} />
      <form
        className="px-24 flex flex-col gap-4 items-center mt-4 max-w-[1000px] mx-auto"
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
          <Button type="CTA Lined" onClick={handleCancle}>
            취소
          </Button>
          <Button>저장</Button>
        </div>
      </form>
    </div>
  );
};

export default PostEdit;
