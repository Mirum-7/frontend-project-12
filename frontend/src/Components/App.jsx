import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error404 from '../pages/Error404';
import Login from '../pages/Login';
import Main from '../pages/Main';
import Redirect from './Redirect';
import StoreProvider from '../providers/Store';
import '../styles/index.scss';

const App = () => (
  <StoreProvider>
    <BrowserRouter>
      <Redirect>
        <Routes>
          <Route path="*" element={<Error404 />} />
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Redirect>
    </BrowserRouter>
  </StoreProvider>
);

export default App;
