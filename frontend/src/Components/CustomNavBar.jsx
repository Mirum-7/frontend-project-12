import {
  Navbar,
  Container,
  Nav,
} from 'react-bootstrap';
import ExitButton from './ExitButton';

const CustomNavbar = () => (
  <Navbar className="bg-white shadow-sm">
    <Container>
      <Navbar.Brand>React chat</Navbar.Brand>
      <Nav>
        <ExitButton />
      </Nav>
    </Container>
  </Navbar>
);

export default CustomNavbar;
