import supabase from '@/libs/supabase.js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const PostDetail = () => {
  const [post, setPost] = useState([]);
  const { postId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId);
      if (!error) {
        setPost(data);
      }
    };

    fetchData();
  }, []);

  return <div>{JSON.stringify(post)}</div>;
};

export default PostDetail;
