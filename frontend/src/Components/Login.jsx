import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../routes';
import { logIn } from '../store/slices/auth';

// const signupSchame = object().shape({
//   username: string()
//     .min(3, 'Минимум 3 буквы')
//     .max(30, 'Максимум 30 букв')
//     .required('Обязательное поле'),
//   password: string()
//     .min(5, 'Минимум 5 букв')
//     .required('Обязательное поле'),
// });

const LoginForm = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    // validationSchema: signupSchame,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.login, values);

        localStorage.setItem('userId', JSON.stringify(response.data));

        dispatch(logIn(response.data));

        const { from } = location.state;
        navigate(from);
      } catch (err) {
        if (err.isAxiosError && err.response?.status === 401) {
          setErrorMessage('Неверный логин или пароль');
        } else {
          setErrorMessage('Ошибка сети');
        }
        setAuthFailed(true);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <fieldset>
        <Form.Group className="mb-3">
          <Form.Label>Ваш ник</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.username}
            placeholder="Введите ник"
            name="username"
            id="username"
            autoComplete="username"
            isInvalid={authFailed}
            required
          />
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
            isInvalid={authFailed}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errorMessage}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="primary">Вход</Button>
      </fieldset>
    </Form>
  );
};

export default LoginForm;
