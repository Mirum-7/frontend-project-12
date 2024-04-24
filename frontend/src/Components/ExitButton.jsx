import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logOut } from '../store/slices/auth';

const ExitButton = () => {
  const dispatch = useDispatch();

  return (
    <Button
      onClick={() => {
        localStorage.removeItem('userId');
        dispatch(logOut());
      }}
      type="button"
      className="btn"
      variant="outline-primary"
    >
      Выйти
    </Button>
  );
};

export default ExitButton;
