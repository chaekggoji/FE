import supabase from '@libs/supabase';

export const writeComment = (postId, userId, content) => {
  return supabase
    .from('comments')
    .insert([{ post_id: postId, user_id: userId, content }]);
};
