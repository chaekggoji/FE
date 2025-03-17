import BoardTitle from '@components/modules/board/BoardTitle';
import profileDefaultIcon from '@assets/icons/icon_profile_default_36.svg';
import arrowUpIcon from '@assets/icons/icon_arrow_up_white_36.svg';
import Button from '@components/common/Button';
import { useNavigate, useParams } from 'react-router';
import CommentItem from '@components/modules/post/CommentItem';

const commentPlaceholder = {
  notices: '게시글에 댓글을 남겨 보세요.',
  debates: '토론 주제에 대한 자신의 생각을 남겨보세요.',
};

const post = {
  id: 1,
  title: '피크닉 가실 분?',
  content:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus sit aut quas fuga perferendis sed facere perspiciatis excepturi, similique tempora voluptatum voluptates expedita omnis, aliquam quos eligendi saepe recusandae adipisci ex consequatur cumque totam, reprehenderit officiis qui. Enim at illum ut minus voluptates nemo nostrum eveniet fugiat repellendus officiis. Ducimus corporis magni reiciendis ipsum eligendi vel, dolorem soluta! Adipisci voluptate nam impedit dicta sed? Optio quisquam rerum molestiae amet alias excepturi commodi quas praesentium voluptatum animi! Velit ipsam ad voluptatum officiis expedita animi, in distinctio dolorem sapiente dolores non at eius, accusantium inventore? Nobis in nam voluptates cupiditate doloremque eaque.',
  user: {
    id: 1,
    nickname: '봄왔다',
  },
};

const comments = [
  {
    id: 1,
    content: '피크닉 음료수 챙겨 갈게요.',
  },
  {
    id: 2,
    content: '날씨가 너무 좋네요.',
  },
  {
    id: 3,
    content:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur quo nesciunt voluptate eveniet unde officia accusantium voluptatibus veritatis aspernatur adipisci in recusandae facilis, suscipit dolores modi totam ea quos obcaecati.',
  },
];
const PostDetail = () => {
  const { boardType } = useParams();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('edit', {
      state: {
        title: post.title,
        content: post.content,
      },
    });
  };

  const handleDelete = () => {
    const ok = window.confirm('정말로 삭제하시겠습니까?');
    if (ok) {
      navigate(-1, { replace: true });
    }
  };

  return (
    <div className="pb-16">
      <BoardTitle title={post.title} />
      <div className="flex flex-col mx-auto max-w-[1000px]">
        {/* 작성자 정보, 수정, 삭제 버튼 */}
        <div className="h-12 flex items-center my-2">
          <div
            className="cursor-pointer flex items-center"
            onClick={() => navigate(`/profile/${post.user.id}`)}
          >
            <img src={profileDefaultIcon} className="mr-2" />
            <p>{post.user.nickname}</p>
          </div>
          <div className="flex ml-auto gap-4">
            <Button onClick={handleEdit}>수정</Button>
            <Button type="CTA Delete" onClick={handleDelete}>
              삭제
            </Button>
          </div>
        </div>
        {/* 글 내용 */}
        <div className=" font-gowunbatang mb-8">{post.content}</div>
        {/* 댓글 */}
        <div>
          {/* 댓글 작성 */}
          <form className="relative mb-4 font-gowunbatang">
            <input
              className="w-full ring-2 ring-slate-300 focus:outline-none focus:ring-primary-400 rounded-2xl px-4 h-12"
              type="text"
              placeholder={commentPlaceholder[boardType]}
            />
            <button className="bg-primary-300 absolute top-0 right-0 h-12 px-3 rounded-r-2xl hover:bg-primary-400 cursor-pointer ring-2 ring-primary-300 hover:ring-primary-400">
              <img src={arrowUpIcon} className="size-9" />
            </button>
          </form>
          {/* 댓글 목록 */}
          <ul className="flex flex-col gap-4">
            {comments.map((comment) => (
              <CommentItem key={comment.id} data={comment} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
