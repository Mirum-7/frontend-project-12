import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const ToMainButton = () => {
  const { t } = useTranslation();

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
      {t('buttons.toMain')}
    </Button>
  );
};

export default ToMainButton;
