import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/auth';
import urls from '../urls';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const { loggedIn } = auth;
  const location = useLocation();

  return (
    loggedIn ? children : <Navigate to={urls.login} state={{ from: location }} />
  );
};

export default PrivateRoute;
