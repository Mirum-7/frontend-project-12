import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ToMainButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        navigate('/');
      }}
      type="button"
      className="btn"
      variant="primary"
    >
      На главную
    </Button>
  );
};

export default ToMainButton;
