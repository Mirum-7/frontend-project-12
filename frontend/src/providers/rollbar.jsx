import { Provider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  // Не знаю как использовать env переменную, не читается
  // Пробовал закинуть в .env файл не получилось
  accessToken: '021c00ed61e54902810d4717dc90b0e4',
  environment: 'production',
};

const RollbarProvider = ({ children }) => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  </Provider>
);

export default RollbarProvider;
