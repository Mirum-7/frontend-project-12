import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { object, ref, string } from 'yup';
import routes from '../routes';
import { logIn } from '../store/slices/auth';

const signupSchame = object().shape({
  username: string()
    .min(3, 'Минимум 3 символов')
    .max(20, 'Максимум 20 символов')
    .required('Обязательное поле'),
  password: string()
    .min(6, 'Минимум 6 символов')
    .required('Обязательное поле'),
  passwordConfirm: string()
    .required('Обязательное поле')
    .oneOf([ref('password')], 'Парольи должны совпадать'),
});

const SignupForm = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const [signUpError, setSignupError] = useState();
  const [isLoading, setIsLoading] = useState(false);

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
          setSignupError('Пользователь уже существует');
        } else {
          setSignupError('Ошибка сети');
        }
      }
      setIsLoading(false);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <fieldset>
        <Form.Group className="mb-3">
          <Form.Label>Ваш ник</Form.Label>
          <Form.Control
            onChange={(e) => {
              setSignupError(null);
              formik.handleChange(e);
            }}
            value={formik.values.username}
            placeholder="Введите ник"
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
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Введите пароль"
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
          <Form.Label>Подтвердите пароль</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.passwordConfirm}
            placeholder="Повторите пароль"
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
        <Button type="submit" variant="primary" disabled={isLoading}>Вход</Button>
      </fieldset>
    </Form>
  );
};

export default SignupForm;
