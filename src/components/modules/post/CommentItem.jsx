import profileDefaultIcon from '@assets/icons/icon_profile_default_36.svg';
import PropTypes from 'prop-types';
import SmallDropdownBox from '@components/common/SmallDropdownBox';
import { getRecentActivity } from '@utils/time';
import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '@queries/posts';
import useUserStore from '@store/useUserStore';
import { forwardRef } from 'react';

const CommentItem = forwardRef(({ data }, ref) => {
  const loggedInUserId = useUserStore((state) => state.loggedInUser.id);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate(`/profile/${data.user_id}`);
  };

  const mutation = useMutation({
    mutationFn: ({ commentId }) => {
      return deleteComment(commentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', data.post_id]);
      window.alert('댓글이 삭제되었습니다.');
    },
    onError: (error) => {
      console.log(error.message);
      window.alert('댓글 삭제 중 오류가 발생했습니다.');
    },
  });

  const handleDelete = () => {
    mutation.mutate({ commentId: data.id });
  };

  return (
    <li
      className="p-4 ring-2 ring-slate-300 rounded-2xl font-gowunbatang md:text-[1rem] text-sm"
      ref={ref}
    >
      <div className="flex items-center mb-2">
        <div
          className="flex items-center cursor-pointer"
          onClick={handleProfileClick}
        >
          <img
            src={data.users?.img_url ? data.users.img_url : profileDefaultIcon}
            className="mr-2 size-9 object-cover rounded-full"
          />
          <p className="font-bold">{data.users?.nickname}</p>
        </div>
        <div className="ml-auto flex gap-2">
          <p className="font-bold text-slate-500">
            {getRecentActivity(data.created_at)}
          </p>

          {/* 수정, 삭제 모달 */}
          {loggedInUserId === data.user_id && (
            <SmallDropdownBox onDelete={handleDelete} />
          )}
        </div>
      </div>
      <p>{data.content}</p>
    </li>
  );
});

CommentItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    users: PropTypes.object.isRequired,
    created_at: PropTypes.string.isRequired,
    user_id: PropTypes.number.isRequired,
    post_id: PropTypes.number.isRequired,
  }),
};

CommentItem.displayName = 'CommentItem'; // eslint 오류 해결

export default CommentItem;
