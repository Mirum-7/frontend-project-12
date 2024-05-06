import {
  Container,
  Nav,
  Navbar,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ExitButton from './buttons/logout';
import useAuth from '../hooks/auth';

const CustomNavbar = () => {
  const { t } = useTranslation();

  const auth = useAuth();

  return (
    <Navbar className="bg-white shadow-sm">
      <Container>
        <Navbar.Brand><Link to="/">{t('navbar.title')}</Link></Navbar.Brand>
        {
          auth.loggedIn ? (
            <Nav>
              <ExitButton />
            </Nav>
          ) : null
        }
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
