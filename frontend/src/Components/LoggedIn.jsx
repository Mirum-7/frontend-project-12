import useAuth from '../hooks/auth';

const LoggedIn = ({ children, show }) => {
  const auth = useAuth();
  const { loggedIn } = auth;

  return (
    loggedIn === show ? children : null
  );
};

export default LoggedIn;
