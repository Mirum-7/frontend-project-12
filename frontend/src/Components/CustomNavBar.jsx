import {
  Container,
  Nav,
  Navbar,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLoggedIn } from '../store/slices/auth';
import ExitButton from './buttons/logout';

const CustomNavbar = () => {
  const { t } = useTranslation();

  const loggedIn = useSelector(getLoggedIn);

  return (
    <Navbar className="bg-white shadow-sm">
      <Container>
        <Navbar.Brand><Link to="/">{t('navbar.title')}</Link></Navbar.Brand>
        <Nav>
          {loggedIn ? <ExitButton /> : null}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
