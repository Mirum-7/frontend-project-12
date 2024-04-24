import {
  Card,
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ExitButton from '../Components/ExitButton';
import LoginForm from '../Components/Login';
import { getLoggedIn } from '../store/slices/auth';

const Login = () => {
  const loggedIn = useSelector(getLoggedIn);

  const content = loggedIn ? (
    <>
      <Card.Title>Вход выполнен</Card.Title>
      <ExitButton />
    </>
  ) : (
    <LoginForm />
  );

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col sm="6" xs="9" md="5" lg="4">
          <Card className="shadow-sm">
            <Card.Body>
              {content}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
