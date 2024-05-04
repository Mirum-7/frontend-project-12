import { Button, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import ChannelNavList from '../components/ChannelNavList';
import Chat from '../components/Chat';
import { open } from '../store/slices/modal';

const Main = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  return (
    <Container className="h-100 p-0 rounded shadow my-sm-4 bg-white d-flex flex-row overflow-auto">
      <aside className="chat-aside">
        <div className="chat-aside__header">
          {t('aside.title')}
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
            {t('buttons.addChannel')}
          </Button>
        </div>
      </aside>
      <main className="flex-grow-1">
        <Chat />
      </main>
    </Container>
  );
};

export default Main;
