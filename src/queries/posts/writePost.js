import supabase from '@libs/supabase';

export const writePost = (studyId, userId, type, title, content) => {
  return supabase
    .from('posts')
    .insert([{ user_id: userId, study_id: studyId, type, title, content }]);
};
