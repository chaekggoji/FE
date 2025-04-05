import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useLoginStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      resetUser: () => set({ user: null }),
    }),
    {
      name: 'user', // localStorage에 저장할 key
      getStorage: () => localStorage,
    },
  ),
);

export default useLoginStore;
