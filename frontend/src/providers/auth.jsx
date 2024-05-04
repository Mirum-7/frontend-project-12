import { useEffect, useMemo, useState } from 'react';
import AuthContext from '../contexts/auth';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(true);

  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem('userId');
  };

  const login = (data) => {
    setLoggedIn(true);
    localStorage.setItem('userId', JSON.stringify(data));
  };

  const getDataFromStorage = () => JSON.parse(localStorage.getItem('userId'));

  useEffect(() => {
    const data = getDataFromStorage();
    if (!data) {
      logout();
    }
  }, []);

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
