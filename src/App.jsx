import supabase from '@libs/supabase';
import router from '@routes/routes';
import useLoginStore from '@store/loginStore';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router';

function App() {
  const { user, setUser } = useLoginStore();

  useEffect(() => {
    // 초기 세션 확인 및 업데이트
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
    };

    getSession();

    // Auth 상태 변화 구독
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session ? session.user : null);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setUser]);

  return <RouterProvider router={router} />;
}

export default App;
