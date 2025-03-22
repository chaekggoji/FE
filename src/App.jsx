import router from '@routes/routes';
import useUserStore from '@store/userStore';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router';

function App() {
  const { user, setUser } = useUserStore();

  useEffect(() => {
    const cookieUser = Cookies.get('user');
    if (cookieUser && !user) {
      setUser(JSON.parse(cookieUser));
    }
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
