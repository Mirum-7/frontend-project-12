import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/auth';
import urls from '../urls';

const UnLoggedInRoute = ({ children }) => {
  const auth = useAuth();
  const { loggedIn } = auth;

  return (
    loggedIn ? <Navigate to={urls.main} /> : children
  );
};

export default UnLoggedInRoute;
