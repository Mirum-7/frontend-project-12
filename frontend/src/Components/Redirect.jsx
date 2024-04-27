import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logIn, getLoggedIn } from '../store/slices/auth';

const freePages = [
  '/login',
  '/signup',
];

const Redirect = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const loggedIn = useSelector(getLoggedIn);

  useEffect(() => {
    if (loggedIn) {
      return;
    }

    const data = JSON.parse(localStorage.getItem('userId'));

    if (data && data.token) {
      dispatch(logIn(data));
    } else if (!freePages.includes(location.pathname)) {
      navigate('/login', {
        state: {
          from: location,
        },
      });
    }
  }, [loggedIn]);

  return children;
};

export default Redirect;
