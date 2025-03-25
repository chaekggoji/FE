import supabase from '@libs/supabase';

export const getPostListByType = (studyId, type) => {
  return supabase
    .from('posts')
    .select(`*`)
    .eq('type', type)
    .eq('study_id', studyId);
};
