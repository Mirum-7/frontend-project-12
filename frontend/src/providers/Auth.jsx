import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/Auth';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userId'));

    if (user && user.token) {
      logIn();
    } else {
      navigate('/login');
    }
  }, [loggedIn]);

  const values = useMemo(() => ({ loggedIn, logIn, logOut }), []);

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
