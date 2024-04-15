import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Error404 from './pages/Error404';
import Main from './pages/Main';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<Error404 />} />
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default App;
