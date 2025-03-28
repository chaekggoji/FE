import BoardTitle from '@components/modules/board/BoardTitle';
import profileDefaultIcon from '@assets/icons/icon_profile_default_36.svg';
import arrowUpIcon from '@assets/icons/icon_arrow_up_white_36.svg';
import Button from '@components/common/Button';
import { useNavigate, useParams } from 'react-router';
import CommentItem from '@components/modules/post/CommentItem';
import { useForm } from 'react-hook-form';
import useMediaQuery from '@hooks/useMediaQuery';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deletePost,
  getCommentListByPostId,
  getPostById,
  writeComment,
} from '@queries/posts';

// 임시 user
const loggedInUserId = 1;

const commentPlaceholder = {
  notice: '게시글에 댓글을 남겨 보세요.',
  debate: '토론 주제에 대한 자신의 생각을 남겨보세요.',
};

const PostDetail = () => {
  const queryClient = useQueryClient();
  const { boardType, postId } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const md = useMediaQuery('(min-width: 768px)');

  // post 상세 내용을 불러오는 useQuery
  const { data: postData, isLoading: postIsLoading } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => {
      return getPostById(postId);
    },
    select: (res) => res.data,
    staleTime: 1000 * 10,
  });

  // post에 달린 댓글 리스트를 불러오는 useQuery
  const { data: commentListData, isLoading: commentListIsLoading } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => {
      return getCommentListByPostId(postId);
    },
    select: (res) => res.data,
    staleTime: 1000 * 10,
  });

  const writeCommentMutation = useMutation({
    mutationFn: ({ postId, content }) => {
      return writeComment(postId, loggedInUserId, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId]);
      window.alert('댓글이 작성되었습니다.');
    },
    onError: (error) => {
      console.log(error.message);
      window.alert('댓글 작성 중 오류가 발생했습니다.');
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: ({ postId }) => {
      return deletePost(postId, loggedInUserId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts', boardType]);
      window.alert('게시글이 삭제되었습니다.');
      navigate(-1, { replace: true });
    },
    onError: (error) => {
      console.log(error.message);
      window.alert('게시글이 삭제 중 오류가 발생했습니다.');
      navigate(-1, { replace: true });
    },
  });

  const handleEdit = () => {
    navigate('edit', {
      state: {
        postId: postData.id,
        title: postData.title,
        content: postData.content,
      },
    });
  };

  const handleDelete = () => {
    const ok = window.confirm('정말로 삭제하시겠습니까?');
    if (ok) {
      deletePostMutation.mutate({ postId: postData.id });
    }
  };

  const onSubmit = (formData) => {
    writeCommentMutation.mutate({
      postId,
      loggedInUserId,
      content: formData.comment,
    });
    reset();
  };

  return (
    <>
      {!postIsLoading && (
        <div className="pb-8 lg:mx-0 md:-mx-8 sm:-mx-6">
          <BoardTitle title={postData.title} />
          <div className="flex flex-col mx-auto max-w-[1000px] lg:px-10 md:px-8 sm:px-6 box-content">
            {/* 작성자 정보, 수정, 삭제 버튼 */}
            <div className="h-12 flex items-center my-2">
              <div
                className="cursor-pointer flex items-center"
                onClick={() => navigate(`/profile/${postData.user.id}`)}
              >
                <img
                  src={
                    postData.users?.img_url
                      ? postData.users.img_url
                      : profileDefaultIcon
                  }
                  className="mr-2 size-9 rounded-full object-cover"
                />
                <p>{postData.users.nickname}</p>
              </div>
              {postData.user_id === loggedInUserId && (
                <div className="flex ml-auto gap-4">
                  <Button size={md ? 'medium' : 'small'} onClick={handleEdit}>
                    수정
                  </Button>
                  <Button
                    size={md ? 'medium' : 'small'}
                    type="CTA Delete"
                    onClick={handleDelete}
                  >
                    삭제
                  </Button>
                </div>
              )}
            </div>
            {/* 글 내용 */}
            <div className=" font-gowunbatang mb-8">{postData.content}</div>
            {/* 댓글 */}
            <div>
              {/* 댓글 작성 */}
              <form
                className="relative mb-4 font-gowunbatang"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  className="w-full ring-2 ring-slate-300 focus:outline-none focus:ring-primary-400 rounded-2xl px-4 h-12"
                  type="text"
                  placeholder={commentPlaceholder[boardType]}
                  {...register('comment')}
                />
                <button className="bg-primary-300 absolute top-0 right-0 h-12 px-3 rounded-r-2xl hover:bg-primary-400 cursor-pointer ring-2 ring-primary-300 hover:ring-primary-400">
                  <img src={arrowUpIcon} className="size-9" />
                </button>
              </form>
              {/* 댓글 목록 */}
              <ul className="flex flex-col gap-4">
                {!commentListIsLoading &&
                  commentListData.map((comment) => (
                    <CommentItem key={comment.id} data={comment} />
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetail;
