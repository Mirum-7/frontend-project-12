import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import init from './init';

const app = async () => {
  const initData = init();

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App init={initData} />
    </React.StrictMode>,
  );
};

export default app;
