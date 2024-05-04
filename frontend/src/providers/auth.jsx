import { useMemo } from 'react';
import AuthContext from '../contexts/auth';

const AuthProvider = ({ children }) => {
  const logout = () => {
    localStorage.removeItem('userId');
  };

  const login = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
  };

  const getTokenFromStorage = () => JSON.parse(localStorage.getItem('userId'));

  const values = useMemo(() => ({ login, logout, getTokenFromStorage }), []);

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
