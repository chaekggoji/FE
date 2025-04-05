import router from '@routes/routes';
import useLoginStore from '@store/loginStore';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router';

function App() {
  const { user, setUser } = useLoginStore();

  useEffect(() => {
    const cookieUser = Cookies.get('user');
    if (cookieUser && !user) {
      setUser(JSON.parse(cookieUser));
    }
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
