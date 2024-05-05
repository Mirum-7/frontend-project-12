import { Provider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_NOT_ROLLBAR_CODE,
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
