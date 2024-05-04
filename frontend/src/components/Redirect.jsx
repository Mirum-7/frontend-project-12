import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/auth';
import urls from '../urls';

const freePages = [
  urls.login,
  urls.signup,
];

const Redirect = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const { loggedIn } = auth;

  useEffect(() => {
    if (loggedIn) {
      return;
    }

    const data = auth.getDataFromStorage();

    if (data && data.token) {
      auth.login(data);
    } else if (!freePages.includes(location.pathname)) {
      navigate(urls.login, {
        state: {
          from: location,
        },
      });
    }
  }, [loggedIn]);

  return children;
};

export default Redirect;
