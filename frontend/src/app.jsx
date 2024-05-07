import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import init from './init';

const app = async (containerId) => {
  const initData = await init();

  const root = ReactDOM.createRoot(document.getElementById(containerId));
  root.render(
    <React.StrictMode>
      <App init={initData} />
    </React.StrictMode>,
  );
};

export default app;
