// store.js
import { create } from 'zustand';

const useUserStore = create((set) => ({
  loggedInUser: {
    id: 1,
  },
  setUser: (user) => set({ loggedInUser: user }),
}));

export default useUserStore;
