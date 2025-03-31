import supabase from '@libs/supabase';

export const writePhrase = (studyId, userId, page, content) => {
  return supabase
    .from('phrases')
    .insert([{ user_id: userId, study_id: studyId, page, content }]);
};
