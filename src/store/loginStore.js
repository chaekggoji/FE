import Cookies from 'js-cookie';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// 스토리지를 사용할 경우
const useLoginStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => {
        Cookies.set('user', JSON.stringify(user), { expires: 7 }); // 쿠키 유효기간 : 7일 후 만료
        set({ user });
      },
      resetUser: () => {
        Cookies.remove('user');
        set({ user: null });
      },
    }),
    {
      name: 'user', // persist 미들웨어용 이름
      getStorage: () => localStorage, // 이건 무시해도 됨 (zustand persist 필수값)
    },
  ),
);

export default useLoginStore;
