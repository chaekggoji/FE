import supabase from '@libs/supabase';

export const editPost = (postId, userId, title, content) => {
  return supabase
    .from('posts')
    .update({ title, content })
    .eq('id', postId)
    .eq('user_id', userId);
};
