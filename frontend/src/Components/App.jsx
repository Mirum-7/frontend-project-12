import {
  BrowserRouter,
  Outlet,
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
import StoreProvider from '../providers/Store';
import RollbarProvider from '../providers/rollbar';
import '../styles/index.scss';
import urls from '../urls';
import CustomNavbar from './CustomNavBar';
import Redirect from './Redirect';
import RenderModals from './modals';
import AuthProvider from '../providers/auth';

const App = () => (
  <RollbarProvider>
    <StoreProvider>
      <AuthProvider>
        <BrowserRouter>
          <Redirect>
            <Routes>
              <Route path="*" element={<Error404 />} />
              <Route
                path={urls.main}
                element={(
                  <>
                    <div className="d-flex flex-column h-100">
                      <CustomNavbar />
                      <Outlet />
                    </div>
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
                  </>
                )}
              >
                <Route path="" element={<Main />} />
                <Route path={urls.login} element={<Login />} />
                <Route path={urls.signup} element={<Signup />} />
              </Route>
            </Routes>
          </Redirect>
        </BrowserRouter>
      </AuthProvider>
    </StoreProvider>
  </RollbarProvider>
);

export default App;
