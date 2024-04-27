import { Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import ChannelNavList from '../Components/ChannelNavList';
import Chat from '../Components/Chat';
import CustomNavbar from '../Components/CustomNavBar';
import { open } from '../store/slices/modal';
import AddModal from '../Components/modals/add';
import EditModal from '../Components/modals/edit';
import RemoveModal from '../Components/modals/remove';
import ErrorModal from '../Components/modals/error';

const Main = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="d-flex flex-column h-100">
        <CustomNavbar />
        <Container className="h-100 p-0 rounded shadow my-sm-4 bg-white d-flex flex-row overflow-auto">
          <aside className="chat-aside">
            <div className="chat-aside__header">
              Каналы
            </div>
            <div className="chat-aside__main">
              <ChannelNavList />
            </div>
            <div className="chat-aside__footer">
              <Button
                variant="primary"
                className="w-100"
                onClick={() => {
                  dispatch(open('add'));
                }}
              >
                Добавить
              </Button>
            </div>
          </aside>
          <main className="flex-grow-1">
            <Chat />
          </main>
        </Container>
      </div>
      <AddModal />
      <EditModal />
      <RemoveModal />
      <ErrorModal />
    </>
  );
};

export default Main;
