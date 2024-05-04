import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getLoggedIn, logIn } from '../store/slices/auth';
import urls from '../urls';
import useAuth from '../hooks/auth';

const freePages = [
  urls.login,
  urls.signup,
];

const Redirect = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const auth = useAuth();

  const loggedIn = useSelector(getLoggedIn);

  useEffect(() => {
    if (loggedIn) {
      return;
    }

    const data = auth.getTokenFromStorage();

    if (data && data.token) {
      dispatch(logIn(data));
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
