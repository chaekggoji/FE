import supabase from '@libs/supabase';

export const deleteComment = (commentId) => {
  return supabase.from('comments').delete().eq('id', commentId);
};
