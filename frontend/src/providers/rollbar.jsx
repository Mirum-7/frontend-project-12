import { Provider, ErrorBoundary } from '@rollbar/react';

const RollbarProvider = ({ children, config }) => (
  <Provider config={config}>
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  </Provider>
);

export default RollbarProvider;
