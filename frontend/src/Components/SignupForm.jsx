import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { object, ref, string } from 'yup';
import routes from '../routes';
import { logIn } from '../store/slices/auth';

const SignupForm = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const [signUpError, setSignupError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const signupSchame = object().shape({
    username: string()
      .min(3, t('signup.validation.username.range'))
      .max(20, t('signup.validation.username.range'))
      .required(t('signup.validation.required')),
    password: string()
      .min(6, t('signup.validation.password.min'))
      .required(t('signup.validation.required')),
    passwordConfirm: string()
      .required(t('signup.validation.required'))
      .oneOf([ref('password')], t('signup.validation.passwordConfirm.oneOf')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: signupSchame,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.post(routes.signup, values);

        localStorage.setItem('userId', JSON.stringify(response.data));

        dispatch(logIn(response.data));

        const { from } = location.state;
        navigate(from);
      } catch (err) {
        if (err.isAxiosError && err.response?.status === 409) {
          setSignupError(t('signup.errors.userExist'));
        } else {
          setSignupError(t('errors.network'));
        }
      }
      setIsLoading(false);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <fieldset>
        <Form.Group className="mb-3">
          <Form.Label>{t('signup.labels.username')}</Form.Label>
          <Form.Control
            onChange={(e) => {
              setSignupError(null);
              formik.handleChange(e);
            }}
            value={formik.values.username}
            placeholder={t('signup.placeholders.username')}
            name="username"
            id="username"
            autoComplete="username"
            isInvalid={formik.errors.username || signUpError}
            disabled={isLoading}
            required
          />
          <Form.Control.Feedback type="invalid">
            { signUpError || formik.errors.username}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{t('signup.labels.password')}</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder={t('signup.placeholders.password')}
            name="password"
            id="password"
            autoComplete="password"
            isInvalid={formik.errors.password}
            disabled={isLoading}
            required
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{t('signup.labels.passwordConfirm')}</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.passwordConfirm}
            placeholder={t('signup.placeholders.passwordConfirm')}
            name="passwordConfirm"
            id="passwordConfirm"
            autoComplete="passwordConfirm"
            isInvalid={formik.errors.passwordConfirm}
            disabled={isLoading}
            required
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.passwordConfirm}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="primary" disabled={isLoading}>{t('signup.submit')}</Button>
      </fieldset>
    </Form>
  );
};

export default SignupForm;
