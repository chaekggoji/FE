import Editor from '@components/common/Editor';
import supabase from '@/libs/supabase.js';
import { useState } from 'react';

const PostWrite = () => {
  const [value, setValue] = useState('');

  // content 포함한 테스트 데이터 삽입
  const insertPost = async (content) => {
    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          type: 'test',
          title: 'test title',
          content,
          study_id: 1,
          user_id: 1,
        },
      ])
      .select();
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    insertPost(value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Editor value={value} onChange={setValue} height={400} />
        <button type="submit">등록</button>
      </form>
    </>
  );
};

export default PostWrite;
