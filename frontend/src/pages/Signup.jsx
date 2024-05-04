import {
  Card,
  Col,
  Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LoggedIn from '../components/LoggedIn';
import SignupForm from '../components/SignupForm';
import ToMainButton from '../components/buttons/toMain';
import urls from '../urls';

const Signup = () => {
  const { t } = useTranslation();

  return (
    <Row className="justify-content-center align-content-center h-100">
      <Col sm="6" xs="9" md="5" lg="4">
        <Card className="shadow-sm">
          <LoggedIn show>
            <Card.Title className="text-center p-3 m-0">{t('info.loggedIn')}</Card.Title>
            <Card.Body className="pt-0 justify-content-end d-flex">
              <ToMainButton />
            </Card.Body>
          </LoggedIn>
          <LoggedIn show={false}>
            <Card.Body>
              <SignupForm />
            </Card.Body>
            <Card.Footer className="text-center">
              <Link to={urls.login}>{t('links.login')}</Link>
            </Card.Footer>
          </LoggedIn>
        </Card>
      </Col>
    </Row>
  );
};

export default Signup;
