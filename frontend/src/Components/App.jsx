import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import {
  Error404,
  Login,
  Main,
  Signup,
} from '../pages';
import StoreProvider from '../providers/Store';
import '../styles/index.scss';
import CustomNavbar from './CustomNavBar';
import Redirect from './Redirect';
import { AddModal, EditModal, RemoveModal } from './modals';

import '../locals';

const App = () => (
  <StoreProvider>
    <BrowserRouter>
      <Redirect>
        <Routes>
          <Route path="*" element={<Error404 />} />
          <Route
            path="/"
            element={(
              <>
                <div className="d-flex flex-column h-100">
                  <CustomNavbar />
                  <Outlet />
                </div>
                <AddModal />
                <EditModal />
                <RemoveModal />
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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </Redirect>
    </BrowserRouter>
  </StoreProvider>
);

export default App;
