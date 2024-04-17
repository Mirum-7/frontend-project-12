import { Button } from 'react-bootstrap';
import useAuth from '../hooks/Auth';

const Main = () => {
  const auth = useAuth();

  return (
    <h1>
      Main page
      <Button onClick={auth.logOut} type="button" className="btn" variant="outline-primary">
        Выйти
      </Button>
    </h1>
  );
};

export default Main;
