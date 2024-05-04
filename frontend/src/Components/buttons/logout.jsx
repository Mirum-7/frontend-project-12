import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/auth';

const ExitButton = () => {
  const { t } = useTranslation();

  const auth = useAuth();

  return (
    <Button
      onClick={() => {
        auth.logout();
      }}
      type="button"
      className="btn"
      variant="outline-primary"
    >
      {t('buttons.logout')}
    </Button>
  );
};

export default ExitButton;
