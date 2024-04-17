import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error404 from '../pages/Error404';
import Login from '../pages/Login';
import Main from '../pages/Main';
import AuthProvider from '../providers/Auth';
import '../styles/index.scss';

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
