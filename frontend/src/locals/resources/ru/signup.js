const signup = {
  validation: {
    username: {
      range: 'От 3 до 20 символов',
    },
    password: {
      min: 'Не менее 6 символов',
    },
    passwordConfirm: {
      oneOf: 'Пароли должны совпадать',
    },
    required: 'Обязательное поле',
  },
  errors: {
    userExist: 'Пользователь уже существует',
  },
  submit: 'Зарегистрироваться',
  labels: {
    username: 'Имя пользователя',
    password: 'Пароль',
    passwordConfirm: 'Подтвердите пароль',
  },
  placeholders: {
    username: 'Имя пользователя',
    password: 'Пароль',
    passwordConfirm: 'Подтвердите пароль',
  },
};

export default signup;
