import {
  Card,
  Col,
  Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SignupForm from '../components/SignupForm';
import urls from '../urls';

const Signup = () => {
  const { t } = useTranslation();

  return (
    <Row className="justify-content-center align-content-center h-100">
      <Col sm="6" xs="9" md="5" lg="4">
        <Card className="shadow-sm">
          <Card.Body>
            <SignupForm />
          </Card.Body>
          <Card.Footer className="text-center">
            <Link to={urls.login}>{t('links.login')}</Link>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default Signup;
