import {
  Card,
  Col,
  Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import urls from '../urls';

const Login = () => {
  const { t } = useTranslation();

  return (
    <Row className="justify-content-center align-content-center h-100">
      <Col sm="6" xs="9" md="5" lg="4">
        <Card className="shadow-sm">
          <Card.Body>
            <LoginForm />
          </Card.Body>
          <Card.Footer className="text-center">
            <Link to={urls.signup}>{t('links.signup')}</Link>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
