import { useMemo, useState } from 'react';
import AuthContext from '../contexts/auth';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('userId'));

  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem('userId');
  };

  const login = (data) => {
    setLoggedIn(true);
    localStorage.setItem('userId', JSON.stringify(data));
  };

  const getDataFromStorage = () => JSON.parse(localStorage.getItem('userId'));

  const values = useMemo(() => ({
    login,
    logout,
    loggedIn,
    getDataFromStorage,
  }), [loggedIn]);

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
