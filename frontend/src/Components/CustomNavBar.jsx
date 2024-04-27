import {
  Container,
  Nav,
  Navbar,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getLoggedIn } from '../store/slices/auth';
import ExitButton from './buttons/Exit';

const CustomNavbar = () => {
  const loggedIn = useSelector(getLoggedIn);

  return (
    <Navbar className="bg-white shadow-sm">
      <Container>
        <Navbar.Brand>Hexlet chat</Navbar.Brand>
        <Nav>
          {loggedIn ? <ExitButton /> : null}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
