import { useFormik } from 'formik';
import { object, string } from 'yup';
import './index.css';

const signupSchame = object().shape({
  username: string()
    .min(3, 'Минимум 3 буквы')
    .max(30, 'Максимум 30 букв')
    .required('Обязательное поле'),
  password: string()
    .min(6, 'Минимум 6 букв')
    .required('Обязательное поле'),
});

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: signupSchame,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
        {formik.errors.username ? <div className="text-error form-error">{formik.errors.username}</div> : <div className="form-error" />}
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
        {formik.errors.password ? <div className="text-error form-error">{formik.errors.password}</div> : <div className="form-error" />}
      </div>

      <button type="submit" className="btn">Войти</button>
    </form>
  );
};

export default LoginForm;
