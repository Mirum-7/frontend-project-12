import { useFormik } from 'formik';
import {
  Button,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { object, string } from 'yup';
import { getUsername } from '../store/slices/auth';
import { useGetChannelsQuery } from '../store/slices/channels';
import { useAddMessageMutation, useGetMessagesQuery } from '../store/slices/messages';
import { getSelectedId } from '../store/slices/selected';

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
  const { data, isLoading, isError } = useGetMessagesQuery();

  let messages = [];
  if (!isLoading && !isError) {
    messages = data
      .filter((message) => message.channelId === selectedChannelId)
      .map((message) => (
        <Message key={message.id} username={message.username}>{message.body}</Message>
      ));
  }

  return (
    <div className="overflow-auto px-5">
      {messages}
    </div>
  );
};

const MessageField = () => {
  const { t } = useTranslation();

  const selectedChannelId = useSelector(getSelectedId);
  const username = useSelector(getUsername);
  const [
    addMessage,
    { isLoading },
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
      }).unwrap()
        .then(() => {
          formik.resetForm();
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
          placeholder={t('chat.field.placeholders.message')}
          onChange={formik.handleChange}
          value={formik.values.message}
          isInvalid={formik.errors.message}
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

  if (isErrorChannels || isErrorMessages) {
    toast.error('errors.network');
  }

  let messageCount = 0;
  let channelName = '';
  if (!isLoadingMessages
    && !isLoadingChannels
    && !isErrorMessages
    && !isErrorChannels
  ) {
    channelName = channels.find((channel) => channel.id === selectedId).name;
    messageCount = messages.filter((message) => message.channelId === selectedId).length;
  }

  return (
    <div className="d-flex flex-column h-100 w-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0"><b>{`# ${channelName}`}</b></p>
        <span className="text-muted">{t('chat.header.messageCount.key', { count: messageCount })}</span>
      </div>
      <MessageBox />
      <div className="mt-auto px-5 py-3">
        <MessageField />
      </div>
    </div>
  );
};

export default Chat;
