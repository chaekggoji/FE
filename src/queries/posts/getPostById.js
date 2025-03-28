import supabase from '@libs/supabase';

export const getPostById = (postId) => {
  return supabase
    .from('posts')
    .select(
      `*,users (id,nickname,img_url)
      `,
    )
    .eq('id', postId)
    .single();
};
