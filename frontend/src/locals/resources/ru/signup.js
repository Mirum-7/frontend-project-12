const signup = {
  validation: {
    username: {
      min: 'Минимум 3 символов',
      max: 'Максимум 20 символов',
    },
    password: {
      min: 'Минимум 6 символов',
    },
    passwordConfirm: {
      oneOf: 'Парольи должны совпадать',
    },
    required: 'Обязательное поле',
  },
  errors: {
    userExist: 'Пользователь уже существует',
  },
  submit: 'Зарегистрироваться',
  labels: {
    username: 'Ваш ник',
    password: 'Пароль',
  },
  placeholders: {
    username: 'Введите ник',
    password: 'Введите пароль',
    passwordConfirm: 'Подтвердите пароль',
  },
};

export default signup;
