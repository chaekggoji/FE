import supabase from '@libs/supabase';

export const editPost = (postId, userId, title, content, imgUrlList) => {
  return supabase
    .from('posts')
    .update({ title, content, img_url: imgUrlList })
    .eq('id', postId)
    .eq('user_id', userId);
};
