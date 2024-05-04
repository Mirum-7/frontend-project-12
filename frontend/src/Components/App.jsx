import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../locals';
import {
  Error404,
  Login,
  Main,
  Signup,
} from '../pages';
import StoreProvider from '../providers/store.jsx';
import RollbarProvider from '../providers/rollbar';
import '../styles/index.scss';
import urls from '../urls';
import CustomNavbar from './CustomNavBar';
import RenderModals from './modals';
import AuthProvider from '../providers/auth';
import PrivateRoute from './PrivateRoute.jsx';

const App = () => (
  <RollbarProvider>
    <StoreProvider>
      <AuthProvider>
        <Router>
          <CustomNavbar />
          <div className="d-flex flex-column h-100">
            <Routes>
              <Route path="*" element={<Error404 />} />
              <Route
                path={urls.main}
                element={(
                  <PrivateRoute>
                    <Main />
                    <RenderModals />
                    <ToastContainer
                      position="top-right"
                      autoClose={2500}
                      hideProgressBar={false}
                      newestOnTop
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable={false}
                      pauseOnHover={false}
                      theme="light"
                    />
                  </PrivateRoute>
                )}
              />
              <Route path={urls.login} element={<Login />} />
              <Route path={urls.signup} element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </StoreProvider>
  </RollbarProvider>
);

export default App;
