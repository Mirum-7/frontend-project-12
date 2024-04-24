import { useFormik } from 'formik';
import {
  Button,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { object, string } from 'yup';
import { useAddMessageMutation, useGetMessagesQuery } from '../store/slices/messages';
import { getSelectedId, getSelectedName } from '../store/slices/selected';
import { getUsername } from '../store/slices/auth';

const Message = ({ username, children }) => (
  <div className="text-break mb-2">
    <b>
      {username}
    </b>
    :&nbsp;
    {children}
  </div>
);

const MessageBox = () => {
  const selectedChannelId = useSelector(getSelectedId);
  const { data, isLoading } = useGetMessagesQuery();

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
  ] = useAddMessageMutation();

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
  const channelName = useSelector(getSelectedName);
  const channelId = useSelector(getSelectedId);
  const { data, isLoading } = useGetMessagesQuery();

  if (isLoading) {
    return null;
  }

  const { length } = data.filter((message) => message.channelId === channelId);

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
