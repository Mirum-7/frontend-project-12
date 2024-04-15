import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from '../hooks/Auth';

const Main = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userId'));

    console.log(user);
    if (user && user.token) {
      auth.logIn();
    } else {
      navigate('/login');
    }
  });

  return (
    <h1>
      Main page
      <button onClick={auth.logOut} type="button" className="btn">
        Выйти
      </button>
    </h1>
  );
};

export default Main;
