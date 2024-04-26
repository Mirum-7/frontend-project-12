import { useFormik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { object, string } from 'yup';
import {
  useAddChannelMutation,
  useEditChannelMutation,
  useGetChannelsQuery,
} from '../store/slices/channels';
import {
  close,
  getOpened,
  getType,
} from '../store/slices/modal';
import { select } from '../store/slices/selected';

const CustomModal = () => {
  const dispatch = useDispatch();
  const opened = useSelector(getOpened);

  const closeHandler = () => dispatch(close());

  const initialValues = {
    name: '',
  };

  const [type, id] = useSelector(getType).split('-');
  let title;
  let handler;

  const [
    addChannel,
  ] = useAddChannelMutation();
  const [
    editChannel,
  ] = useEditChannelMutation();
  const { data, isLoading } = useGetChannelsQuery();

  let names = [];
  if (!isLoading) {
    names = data.map((channel) => channel.name);
  }

  switch (type) {
    case 'add':
      title = 'Добавить канал';
      handler = (values) => {
        addChannel(values)
          .then((response) => {
            dispatch(select(response.data));
          });
      };
      break;
    case 'edit':
      title = 'Изменить канал';
      handler = (values) => {
        editChannel({ id, channel: values });
      };
      break;
    default:
      title = 'Окно';
  }

  const shcema = object().shape({
    name: string()
      .required('Введите название')
      .min(3, 'Название должно быть больше 3 символов')
      .max(20, 'Название должно быть меньше 20 символов')
      .notOneOf(names, 'Название должно быть уникальным'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: shcema,
    onSubmit: (values) => {
      formik.resetForm();
      handler(values);
      closeHandler();
    },
  });

  return (
    <Modal show={opened} onHide={closeHandler}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group has-validation>
            <Form.Control
              id="name"
              type="text"
              placeholder="Введите название"
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.errors.name}
              autoFocus
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
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
          }}
        >
          Отправить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
