import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { logOut } from '../../store/slices/auth';

const ExitButton = () => {
  const { t } = useTranslation();

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
      {t('buttons.logout')}
    </Button>
  );
};

export default ExitButton;
