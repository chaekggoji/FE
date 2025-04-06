import supabase from '@libs/supabase';
import router from '@routes/routes';
import useUserStore from '@store/useUserStore';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router';

function App() {
  const { setAuthUser, setProfile, resetUser } = useUserStore();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setAuthUser(session.user);

        const { data: profileData } = await supabase
          .from('users')
          .select('*')
          .eq('auth_id', session.user.id)
          .single();

        if (profileData) {
          setProfile(profileData);
        }
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          setAuthUser(session.user);

          const { data: profileData } = await supabase
            .from('users')
            .select('*')
            .eq('auth_id', session.user.id)
            .single();

          setProfile(profileData);
        } else {
          resetUser();
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setAuthUser, setProfile, resetUser]);

  return <RouterProvider router={router} />;
}

export default App;
