import { useFormik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  useAddChannelMutation,
  useEditChannelMutation,
} from '../store/slices/channels';
import {
  close,
  getOpened,
  getType,
} from '../store/slices/modal';

const CustomModal = () => {
  const dispatch = useDispatch();
  const opened = useSelector(getOpened);

  const initialValues = {
    name: '',
  };

  const [type, id] = useSelector(getType).split('-');
  let title;
  let response;

  const [
    addChannel,
  ] = useAddChannelMutation();
  const [
    editChannel,
  ] = useEditChannelMutation();

  switch (type) {
    case 'add':
      title = 'Добавить канал';
      response = (values) => {
        addChannel(values);
      };
      break;
    case 'edit':
      title = 'Изменить канал';
      response = (values) => {
        editChannel({ id, channel: values });
      };
      break;
    default:
      title = 'Окно';
  }

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      formik.resetForm();
      response(values);
    },
  });

  const closeHandler = () => dispatch(close());

  return (
    <Modal show={opened} onHide={closeHandler}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              id="name"
              type="text"
              placeholder="Введите название"
              onChange={formik.handleChange}
              value={formik.values.name}
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeHandler}>
          Отмена
        </Button>
        <Button
          variant="primary"
          onClick={(e) => {
            formik.handleSubmit(e);
            closeHandler();
          }}
        >
          Отправить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
