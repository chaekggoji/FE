import supabase from '@libs/supabase';

export const deletePhrase = (phraseId) => {
  return supabase.from('phrases').delete().eq('id', phraseId);
};
