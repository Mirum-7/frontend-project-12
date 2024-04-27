import {
  Card,
  Col,
  Row,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import LoginForm from '../Components/LoginForm';
import { getLoggedIn } from '../store/slices/auth';
import ToMainButton from '../Components/buttons/ToMain';

const Login = () => {
  const loggedIn = useSelector(getLoggedIn);

  return (
    <Row className="justify-content-center align-content-center h-100">
      <Col sm="6" xs="9" md="5" lg="4">
        <Card className="shadow-sm">
          {loggedIn ? (
            <>
              <Card.Title className="text-center p-3 m-0">Вход выполнен</Card.Title>
              <Card.Body className="pt-0 justify-content-end d-flex">
                <ToMainButton />
              </Card.Body>
            </>
          ) : (
            <Card.Body>
              <LoginForm />
            </Card.Body>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
