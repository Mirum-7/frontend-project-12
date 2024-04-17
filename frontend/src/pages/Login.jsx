import { Row, Col, Card } from 'react-bootstrap';
import LoginForm from '../Components/Login';
import useAuth from '../hooks/Auth';

const Login = () => {
  const auth = useAuth();

  if (auth.loggedIn) {
    return (<h1>Вход выполнен</h1>);
  }
  return (
    <div className="container-fluid h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col sm="6" xs="9" md="5" lg="4">
          <Card className="p-3 shadow-sm">
            <LoginForm />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
