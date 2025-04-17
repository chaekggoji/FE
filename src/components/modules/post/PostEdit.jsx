import Button from '@components/common/Button';
import Editor from '@components/common/Editor';
import BoardTitle from '@components/modules/board/BoardTitle';
import ImageUploadBox from '@components/modules/post/ImageUploadBox';
import useMediaQuery from '@hooks/useMediaQuery';
import supabase from '@libs/supabase';
import { editPost } from '@queries/posts';
import useUserStore from '@store/useUserStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router';

// Todo
// 1. preview image base64 decode 해보기
// 2. preview에서 이미지 제거 시 스토리지에서 파일 제거

const title = {
  notice: '공지사항 글 수정',
  debate: '토론 글 수정',
};

const PostEdit = () => {
  const loggedInUserId = useUserStore((state) => state.loggedInUser.id);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { boardType } = useParams();
  const { register, handleSubmit, control } = useForm();
  const location = useLocation();
  const md = useMediaQuery('(min-width: 768px)');
  // 이미지 수정에 필요한 states
  // 초기값은 post data의 img_url에서 불러 옵니다.
  const [postImages, setPostImages] = useState(location.state.imgUrlList); // 불러 온 img_url(string), 추가된 File(object)의 혼합 배열
  const [previewImages, setPreviewImages] = useState(location.state.imgUrlList); // 불러 온 img_url(string), 추가된 base64 이미지(string) 배열

  // 게시글 수정 API 요청 함수
  const mutation = useMutation({
    mutationFn: ({ title, content, imgUrlList }) => {
      return editPost(
        location.state.postId,
        loggedInUserId,
        title,
        content,
        imgUrlList,
      );
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

  // 수정 취소 핸들러
  const handleCancle = (event) => {
    event.preventDefault();
    alert('글 수정이 취소되었습니다.');
    navigate(-1, { replace: true });
  };

  // 폼 제출 핸들러
  const onSubmit = async (formData) => {
    let uploadedImageUrlList = [];
    if (postImages.length > 0) {
      uploadedImageUrlList = await handleUploadStorage(postImages);
    }
    mutation.mutate({
      title: formData.title,
      content: formData.content,
      imgUrlList: uploadedImageUrlList,
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

    setPostImages((prev) => {
      return [...prev, ...fileList];
    });

    const fileUrlList = [];

    fileList.forEach((file, index) => {
      const reader = new FileReader();
      // 콜백 함수 등록 (read후 실행)
      reader.onload = () => {
        fileUrlList[index] = reader.result;
        // 모든 파일을 다 읽었을 때만 setPreviewImages 실행 (falsy 값 제거)
        if (fileUrlList.filter(Boolean).length === fileList.length) {
          setPreviewImages((prev) => {
            return [...prev, ...fileUrlList];
          });
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

  // 수퍼베이스 스토리지에 파일 업로드 후 public url 이미지 배열을 반환
  const handleUploadStorage = async (files) => {
    const uploadedImgUrls = [];

    for (let i = 0; i < files.length; i++) {
      // File 객체일때 스토리지에 업로드
      if (files[i] instanceof File) {
        const fileName = `post_${Date.now()}_${i}.${files[i].type.split('/')[1]}`;

        const { data, error } = await supabase.storage
          .from('post-images')
          .upload(fileName, files[i]);

        if (error) {
          console.log('이미지 업로드에 실패하였습니다.');
          return;
        }

        const res = supabase.storage
          .from('post-images')
          .getPublicUrl(data.path);
        uploadedImgUrls.push(res.data.publicUrl);
      } else {
        // 이미 스토리지에 있는 이미지일때
        uploadedImgUrls.push(files[i]);
      }
    }
    return uploadedImgUrls;
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
        <Controller
          name="content"
          defaultValue={location.state.content}
          control={control}
          render={({ field }) => (
            <Editor
              value={field.value}
              onChange={field.onChange}
              height={300}
            />
          )}
        />
        <ImageUploadBox
          onImageUpload={handleImageUpload}
          onImageDelete={handleImageDelete}
          previewImages={previewImages}
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
