import {
  Container,
  Nav,
  Navbar,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ExitButton from './buttons/logout';
import LoggedIn from './LoggedIn';

const CustomNavbar = () => {
  const { t } = useTranslation();

  return (
    <Navbar className="bg-white shadow-sm">
      <Container>
        <Navbar.Brand><Link to="/">{t('navbar.title')}</Link></Navbar.Brand>
        <Nav>
          <LoggedIn show>
            <ExitButton />
          </LoggedIn>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
