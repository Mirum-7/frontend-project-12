import { useFormik } from 'formik';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/auth';
import { useLoginMutation } from '../store/slices/auth';

const LoginForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  const [authFailed, setAuthFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [
    login,
  ] = useLoginMutation();

  const navigate = useNavigate();
  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const data = await login(values).unwrap();

        auth.login(data);

        const { from } = location.state;
        navigate(from);
      } catch (err) {
        if (err.isAxiosError && err.response?.status === 401) {
          setErrorMessage(t('login.errors.incorrectData'));
        } else {
          setErrorMessage(t('errors.network'));
        }
        setAuthFailed(true);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <fieldset>
        <Form.Group className="mb-3">
          <Form.Label>{t('login.labels.username')}</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.username}
            placeholder={t('login.placeholders.username')}
            name="username"
            id="username"
            autoComplete="username"
            isInvalid={authFailed}
            disabled={isLoading}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder={t('login.placeholders.password')}
            name="password"
            id="password"
            autoComplete="password"
            isInvalid={authFailed}
            disabled={isLoading}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errorMessage}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="primary" disabled={isLoading}>Вход</Button>
      </fieldset>
    </Form>
  );
};

export default LoginForm;
