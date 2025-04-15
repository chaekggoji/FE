import Button from '@components/common/Button';
import Editor from '@components/common/Editor';
import BoardTitle from '@components/modules/board/BoardTitle';
import { writePost } from '@queries/posts';
import useUserStore from '@store/useUserStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import imageUploadIcon from '@assets/icons/icon_plus_white_24.svg';

// 리팩토링 목록
// - 텍스트 에디터 사용
// - 사진 등록

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
  const loggedInUserId = useUserStore((state) => state.loggedInUser.id);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { studyId, boardType } = useParams();
  const { register, watch, setValue, handleSubmit } = useForm();

  const mutation = useMutation({
    mutationFn: ({ studyId, loggedInUserId, type, title, content }) => {
      return writePost(studyId, loggedInUserId, type, title, content);
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

  const handleCancle = (event) => {
    event.preventDefault();
    alert('글 작성이 취소되었습니다.');
    navigate(-1, { replace: true });
  };

  const onSubmit = (formData) => {
    console.log(formData);
    // mutation.mutate({
    //   studyId,
    //   loggedInUserId,
    //   type: boardType,
    //   title: formData.title,
    //   content: formData.content,
    // });
  };

  useEffect(() => {
    register('content', { required: true });
  }, [register]);

  const onHtmlContentChange = (htmlContent) => {
    setValue('content', htmlContent);
  };

  // content가 변경될때 마다 htmlContent를 업데이트 시킴 (리렌더링 발생)
  const htmlContent = watch('content');

  return (
    <div className="pb-8 lg:mx-0 md:-mx-8 sm:-mx-6">
      <BoardTitle title={title[boardType]} />
      <form
        className="flex flex-col gap-4 items-center mt-4 max-w-[1000px] mx-auto lg:px-10 md:px-8 sm:px-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="w-full border-3 border-slate-300 focus:outline-none rounded-2xl px-4 py-3"
          type="text"
          placeholder={titlePlaceholder[boardType]}
          {...register('title')}
        />
        <Editor
          value={htmlContent}
          onChange={onHtmlContentChange}
          height={300}
        />
        <div className="w-full border-3 border-slate-300 rounded-2xl flex p-2 md:mt-0 mt-6">
          <label
            htmlFor="image-upload"
            className="cursor-pointer w-20 h-20 bg-primary-200 rounded-xl flex justify-center items-center"
          >
            <img src={imageUploadIcon} className="size-8" />
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
          />
        </div>
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
