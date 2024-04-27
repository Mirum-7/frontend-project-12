import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import CustomNavbar from './CustomNavBar';
import AddModal from './modals/add';
import EditModal from './modals/edit';
import ErrorModal from './modals/error';
import RemoveModal from './modals/remove';
import Error404 from '../pages/Error404';
import Login from '../pages/Login';
import Main from '../pages/Main';
import Signup from '../pages/Signup';
import StoreProvider from '../providers/Store';
import '../styles/index.scss';
import Redirect from './Redirect';

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
                <ErrorModal />
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
