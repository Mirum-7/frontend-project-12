import {
  Container,
  Nav,
  Navbar,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getLoggedIn } from '../store/slices/auth';
import ExitButton from './buttons/logout';

const CustomNavbar = () => {
  const { t } = useTranslation();

  const loggedIn = useSelector(getLoggedIn);

  return (
    <Navbar className="bg-white shadow-sm">
      <Container>
        <Navbar.Brand>{t('navbar.title')}</Navbar.Brand>
        <Nav>
          {loggedIn ? <ExitButton /> : null}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
