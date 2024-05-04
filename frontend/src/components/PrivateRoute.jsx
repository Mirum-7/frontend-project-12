import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/auth';
import urls from '../urls';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const { loggedIn } = auth;

  return (
    loggedIn ? children : <Navigate to={urls.login} />
  );
};

export default PrivateRoute;
