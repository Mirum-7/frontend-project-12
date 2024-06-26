import { I18nextProvider } from 'react-i18next';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {
  Error404,
  Login,
  Main,
  Signup,
} from '../pages';
import {
  AuthProvider,
  RollbarProvider,
  SocketProvider,
  StoreProvider,
} from '../providers';
import '../styles/index.scss';
import urls from '../urls.js';
import CustomNavbar from './CustomNavBar.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import PublicRoute from './PublicRoute.jsx';
import RenderModals from './modals';

const App = ({ init }) => {
  const {
    socket,
    i18n,
    rollbarConfig,
  } = init;

  return (
    <RollbarProvider config={rollbarConfig}>
      <StoreProvider>
        <SocketProvider socket={socket}>
          <AuthProvider>
            <I18nextProvider i18n={i18n} defaultNS="translation">
              <Router>
                <CustomNavbar />
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable={false}
                  pauseOnHover={false}
                  theme="light"
                />
                <div className="d-flex flex-column h-100">
                  <Routes>
                    <Route path="*" element={<Error404 />} />
                    <Route
                      path={urls.main}
                      element={(
                        <PrivateRoute>
                          <Main />
                          <RenderModals />
                        </PrivateRoute>
                      )}
                    />
                    <Route
                      path={urls.login}
                      element={(
                        <PublicRoute>
                          <Login />
                        </PublicRoute>
                      )}
                    />
                    <Route
                      path={urls.signup}
                      element={(
                        <PublicRoute>
                          <Signup />
                        </PublicRoute>
                      )}
                    />
                  </Routes>
                </div>
              </Router>
            </I18nextProvider>
          </AuthProvider>
        </SocketProvider>
      </StoreProvider>
    </RollbarProvider>
  );
};

export default App;
