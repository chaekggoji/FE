// store.js
// import { create } from 'zustand';

// const useUserStore = create((set) => ({
//   loggedInUser: {
//     id: 1,
//   },
//   setUser: (user) => set({ loggedInUser: user }),
// }));

// export default useUserStore;

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      authUser: null, // Supabase 인증 유저
      profile: null, // users 테이블 정보

      setAuthUser: (user) => set({ authUser: user }),
      setProfile: (profile) => set({ profile }),

      resetUser: () => set({ authUser: null, profile: null }),
    }),
    {
      name: 'userStore',
      getStorage: () => localStorage,
    },
  ),
);

export default useUserStore;
