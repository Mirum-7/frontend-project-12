import {
  Card,
  Col,
  Row,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLoggedIn } from '../store/slices/auth';
import SignupForm from '../Components/SignupForm';
import ToMainButton from '../Components/buttons/ToMain';

const Signup = () => {
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
              <SignupForm />
            </Card.Body>
          )}
          <Card.Footer className="text-center">
            <Link to="/login">Войти</Link>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default Signup;
