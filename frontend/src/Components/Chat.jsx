import { useFormik } from 'formik';
import { useEffect } from 'react';
import {
  Button,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { object, string } from 'yup';
import { getUsername } from '../store/slices/auth';
import { useGetChannelsQuery } from '../store/slices/channels';
import { useAddMessageMutation, useGetMessagesQuery } from '../store/slices/messages';
import { getSelectedId } from '../store/slices/selected';

const Message = ({ username, children, error }) => {
  if (error) {
    return <div className="text-danger">Не удалось отправиться сообщение</div>;
  }

  return (
    <div className="text-break mb-2">
      <b>
        {username}
      </b>
      :&nbsp;
      {children}
    </div>
  );
};

const MessageBox = () => {
  const selectedChannelId = useSelector(getSelectedId);
  const { data, isLoading, isError } = useGetMessagesQuery();

  if (isError) {
    return null;
  }

  if (isLoading) {
    return null;
  }

  const messages = data
    .filter((message) => message.channelId === selectedChannelId)
    .map((message) => (
      <Message key={message.id} username={message.username}>{message.body}</Message>
    ));

  return (
    <div className="overflow-auto px-5">
      {messages}
    </div>
  );
};

const MessageField = () => {
  const selectedChannelId = useSelector(getSelectedId);
  const username = useSelector(getUsername);
  const [
    addMessage,
    { isError },
  ] = useAddMessageMutation();

  useEffect(() => {
    if (isError) {
      alert('Не удалось отправить сообщение');
    }
  }, [isError]);

  const shcema = object().shape({
    message: string().required(),
  });

  const formik = useFormik({
    validationSchema: shcema,
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      addMessage({
        body: values.message,
        channelId: selectedChannelId,
        username,
      });
      formik.resetForm();
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <InputGroup>
        <Form.Control
          id="message"
          type="text"
          placeholder="Введите сообщение"
          onChange={formik.handleChange}
          value={formik.values.message}
          isInvalid={formik.errors.message}
          autoFocus
        />
        <Button
          type="submit"
          variant="outline-secondary"
          className="border"
        >
          Отправить
        </Button>
      </InputGroup>
    </Form>
  );
};

const Chat = () => {
  const selectedId = useSelector(getSelectedId);
  const {
    data: messages,
    isLoading: isLoadingMessages,
    isError: isErrorMessages,
  } = useGetMessagesQuery();
  const {
    data: channels,
    isLoading: isLoadingChannels,
    isError: isErrorChannels,
  } = useGetChannelsQuery();

  if (isErrorMessages || isErrorChannels) {
    return null;
  }

  if (isLoadingMessages || isLoadingChannels) {
    return null;
  }

  const { name: channelName } = channels.find((channel) => channel.id === selectedId);

  const { length } = messages.filter((message) => message.channelId === selectedId);

  const getVariant = (count) => {
    if (count === 1) {
      return 'сообщение';
    }
    if (count < 5 && count !== 0) {
      return 'сообщения';
    }
    return 'сообщений';
  };

  return (
    <div className="d-flex flex-column h-100 w-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0"><b>{`# ${channelName}`}</b></p>
        <span className="text-muted">{`${length} ${getVariant(length)}`}</span>
      </div>
      <MessageBox />
      <div className="mt-auto px-5 py-3">
        <MessageField />
      </div>
    </div>
  );
};

export default Chat;
