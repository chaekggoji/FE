import supabase from '@/libs/supabase.js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const PostDetail = () => {
  const [post, setPost] = useState([]);
  const { postId } = useParams(); // url로부터 postId 가져오기

  // postId와 일치하는 게시글 조회
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId);
      if (!error) {
        setPost(data[0]);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {post && (
        <div>
          <h1>{post.title}</h1>
          <div>{post.content}</div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
