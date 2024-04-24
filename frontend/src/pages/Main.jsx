import { Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import ChannelNavList from '../Components/ChannelNavList';
import CustomModal from '../Components/CustomModal';
import CustomNavbar from '../Components/CustomNavBar';
import { open } from '../store/slices/modal';

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
          <main>
            chat
          </main>
        </Container>
      </div>
      <CustomModal />
    </>
  );
};

export default Main;
