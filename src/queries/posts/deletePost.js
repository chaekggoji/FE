import supabase from '@libs/supabase';

export const deletePost = (postId, userId) => {
  return supabase
    .from('posts')
    .delete()
    .eq('id', postId)
    .eq('user_id', userId)
    .select();
};
