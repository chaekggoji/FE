import supabase from '@libs/supabase';

export const getStudyMemberList = (studyId) => {
  return supabase
    .from('study_participants')
    .select('role, users(id, nickname, img_url)')
    .eq('study_id', studyId);
};
