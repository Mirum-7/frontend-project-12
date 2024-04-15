import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './providers/Auth';
import Login from './pages/Login';
import Error404 from './pages/Error404';
import Main from './pages/Main';

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
