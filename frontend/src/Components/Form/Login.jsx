import { useFormik } from 'formik';
import { object, string } from 'yup';
import './index.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import useAuth from '../../hooks/Auth';

const signupSchame = object().shape({
  username: string()
    .min(3, 'Минимум 3 буквы')
    .max(30, 'Максимум 30 букв')
    .required('Обязательное поле'),
  password: string()
    .min(5, 'Минимум 5 букв')
    .required('Обязательное поле'),
});

const LoginForm = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();

  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: signupSchame,
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const response = await axios.post(routes.login, values);
        localStorage.setItem('userId', JSON.stringify(response.data));

        auth.logIn();

        navigate('/');
      } catch (err) {
        setAuthFailed(true);
        console.log(err);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1 className="form-header">Вход</h1>

      <div className="form-group">
        <label htmlFor="username">Ваш ник</label>
        <input
          className="form-control"
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <div className="form-error text-error">{formik.errors.username ? formik.errors.username : null}</div>
      </div>

      <div className="form-group">
        <label htmlFor="password">Пароль</label>
        <input
          className="form-control"
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <div className="form-error text-error">{formik.errors.password ? formik.errors.password : null}</div>
      </div>

      <div className="form-error text-error">{authFailed ? 'Не правильный логин или пароль' : null}</div>
      <button type="submit" className="btn">Войти</button>
    </form>
  );
};

export default LoginForm;
