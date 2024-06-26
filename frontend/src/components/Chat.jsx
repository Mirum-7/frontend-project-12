import { useFormik } from 'formik';
import filter from 'leo-profanity';
import { useEffect, useRef } from 'react';
import {
  Button,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { object, string } from 'yup';
import useAuth from '../hooks/auth';
import baseApi from '../store/slices/baseApi';
import { useGetChannelsQuery } from '../store/slices/channels';
import { useAddMessageMutation, useGetMessagesQuery } from '../store/slices/messages';
import { getSelectedId } from '../store/slices/selected';
import useSocket from '../hooks/socket';

const Message = ({ username, children }) => (
  <div className="text-break mb-2">
    <b>
      {username}
    </b>
    :&nbsp;
    {filter.clean(children)}
  </div>
);

const MessageBox = () => {
  const ref = useRef();

  const dispatch = useDispatch();

  const selectedChannelId = useSelector(getSelectedId);
  const { data } = useGetMessagesQuery();

  const socket = useSocket();

  useEffect(() => {
    ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [data]);

  useEffect(() => {
    const onNewMessage = (newMessage) => {
      dispatch(
        baseApi.util.updateQueryData('getMessages', undefined, (draft) => {
          draft.push(newMessage);
        }),
      );
    };

    socket.on('newMessage', onNewMessage);

    return () => {
      socket.off('newMessage');
    };
  }, []);

  const messages = data
    ?.filter((message) => message.channelId === selectedChannelId)
    .map((message) => (
      <Message key={message.id} username={message.username}>{message.body}</Message>
    ));

  return (
    <div className="overflow-auto px-5" ref={ref}>
      {messages}
    </div>
  );
};

const MessageField = () => {
  const { t } = useTranslation();

  const auth = useAuth();

  const username = auth.getDataFromStorage()?.username;

  const selectedChannelId = useSelector(getSelectedId);
  const [
    addMessage,
    { isLoading },
  ] = useAddMessageMutation();

  const ref = useRef();

  const schema = object().shape({
    message: string().required(),
  });

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      addMessage({
        body: values.message,
        channelId: selectedChannelId,
        username,
      }).unwrap()
        .then(() => {
          formik.resetForm();
          ref.current.focus();
        })
        .catch(() => {
          toast.error(t('toast.errors.sendMessage'));
        });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <InputGroup>
        <Form.Control
          id="message"
          type="text"
          aria-label="Новое сообщение"
          placeholder={t('chat.field.placeholders.message')}
          onChange={formik.handleChange}
          value={formik.values.message}
          isInvalid={formik.errors.message}
          ref={ref}
          autoFocus
        />
        <Button
          type="submit"
          variant="outline-secondary"
          className="border"
          disabled={isLoading}
        >
          {t('chat.field.submit')}
        </Button>
      </InputGroup>
    </Form>
  );
};

const Chat = () => {
  const { t } = useTranslation();

  const auth = useAuth();

  const selectedId = useSelector(getSelectedId);
  const {
    data: messages,
    error: getMessagesError,
  } = useGetMessagesQuery();
  const {
    data: channels,
  } = useGetChannelsQuery();

  useEffect(() => {
    if (
      getMessagesError
      && getMessagesError.status === 401
    ) {
      auth.logout();
    }
  }, [getMessagesError]);

  const channelName = channels?.find((channel) => channel.id === selectedId)?.name;
  const messageCount = messages?.filter((message) => message.channelId === selectedId).length;

  return (
    <div className="d-flex flex-column h-100 w-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0"><b>{`# ${channelName ?? null}`}</b></p>
        <span className="text-muted">
          {
            messageCount ? t('chat.header.messageCount.key', { count: messageCount }) : null
          }
        </span>
      </div>
      <MessageBox />
      <div className="mt-auto px-5 py-3">
        <MessageField />
      </div>
    </div>
  );
};

export default Chat;
