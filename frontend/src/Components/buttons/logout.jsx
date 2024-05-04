import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { logOut } from '../../store/slices/auth';
import useAuth from '../../hooks/auth';

const ExitButton = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const auth = useAuth();

  return (
    <Button
      onClick={() => {
        dispatch(logOut());
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
