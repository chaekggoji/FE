import Button from '@components/common/Button';
import Editor from '@components/common/Editor';
import BoardTitle from '@components/modules/board/BoardTitle';
import { writePost } from '@queries/posts';
import useUserStore from '@store/useUserStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import supabase from '@libs/supabase';
import ImageUploadBox from '@components/modules/post/ImageUploadBox';

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
  const { register, control, handleSubmit } = useForm();
  const [postImages, setPostImages] = useState([]); // 스토리지에 등록할 이미지 파일
  const [previewImages, setPreviewImages] = useState([]); // 이미지 미리보기에 표시할 이미지 (base64 인코딩)

  // 게시글 작성 함수
  const mutation = useMutation({
    mutationFn: ({
      studyId,
      loggedInUserId,
      type,
      title,
      content,
      imgUrlList,
    }) => {
      return writePost(
        studyId,
        loggedInUserId,
        type,
        title,
        content,
        imgUrlList,
      );
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

  // 게시글 작성 취소
  const handleCancle = (event) => {
    event.preventDefault();
    alert('글 작성이 취소되었습니다.');
    navigate(-1, { replace: true });
  };

  // 수퍼베이스 스토리지에 파일 업로드 후 public url 이미지 배열을 반환
  const handleUploadStorage = async (files) => {
    const uploadedImageLists = [];

    for (let i = 0; i < files.length; i++) {
      // 파일 이름 생성
      const fileName = `post_${Date.now()}_${i}.${files[i].type.split('/')[1]}`;

      // 스토리지 업로드
      const { data, error } = await supabase.storage
        .from('post-images')
        .upload(fileName, files[i]);

      if (error) {
        console.log('이미지 업로드에 실패하였습니다.');
        return;
      }

      // storage에 담긴 이미지의 publicUrl 가져오기
      const res = supabase.storage.from('post-images').getPublicUrl(data.path);
      uploadedImageLists.push(res.data.publicUrl);
    }
    return uploadedImageLists;
  };

  // 폼 제출 핸들러
  const onSubmit = async (formData) => {
    let uploadedImageUrlList = [];
    if (postImages.length > 0) {
      uploadedImageUrlList = await handleUploadStorage(postImages);
    }
    mutation.mutate({
      studyId,
      loggedInUserId,
      type: boardType,
      title: formData.title,
      content: formData.content,
      imgUrl: uploadedImageUrlList,
    });
  };

  // 이미지 추가, 미리보기
  const handleImageUpload = (e) => {
    const fileList = Array.from(e.target.files);

    for (const file of fileList) {
      if (file.size > 3 * 1024 * 1024) {
        // 3MB를 바이트로 변환
        alert('업로드 할 수 있는 최대 파일의 크기는 3MB 입니다.');
        return;
      }
    }

    if (postImages.length + fileList.length > 3) {
      alert('이미지는 최대 3개까지 업로드할 수 있습니다.');
      return;
    }

    setPostImages((prev) => [...prev, ...fileList]);

    const fileUrlList = [];

    fileList.forEach((file, index) => {
      const reader = new FileReader();
      // 콜백 함수 등록 (read후 실행)
      reader.onload = () => {
        fileUrlList[index] = reader.result;
        // 모든 파일을 다 읽었을 때만 setPreviewImages 실행 (falsy 값 제거)
        if (fileUrlList.filter(Boolean).length === fileList.length) {
          setPreviewImages((prev) => [...prev, ...fileUrlList]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // 이미지 제거
  const handleImageDelete = (index) => {
    setPostImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

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
        {/* react-hook-form의 Controller로 외부 인풋 라이브러리를 비제어 컴포넌트로 관리  */}
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <Editor
              placeholder={contentPlaceholder[boardType]}
              value={field.value}
              onChange={field.onChange}
              height={300}
            />
          )}
        />
        <ImageUploadBox
          previewImages={previewImages}
          onImageUpload={handleImageUpload}
          onImageDelete={handleImageDelete}
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
