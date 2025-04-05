import supabase from '@libs/supabase';

export const joinStudy = (studyId, userId) => {
  return supabase
    .from('study_participants')
    .insert([{ user_id: userId, study_id: studyId, role: 'member' }]);
};
