import supabase from '@libs/supabase';

export const getUserListById = (userIdList) => {
  return supabase
    .from('users')
    .select('id, nickname, img_url')
    .in('id', userIdList);
};
