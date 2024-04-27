import { useFormik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { object, string } from 'yup';
import {
  close,
  getOpened,
  getType,
} from '../../store/slices/modal';
import { useAddChannelMutation, useGetChannelsQuery } from '../../store/slices/channels';

const AddModal = () => {
  const dispatch = useDispatch();
  const status = useSelector(getOpened);
  const type = useSelector(getType);

  const [
    addChannel,
    { isLoading: isLoadingAdd },
  ] = useAddChannelMutation();
  const { data, isLoading: isLoadingGet, isError: isErrorGet } = useGetChannelsQuery();

  let names = [];
  if (!isLoadingGet && !isErrorGet) {
    names = data.map((channel) => channel.name);
  }

  const isOpened = status && type === 'add';

  const closeHandler = (formik) => {
    dispatch(close());
    formik.resetForm();
  };

  const initialValues = {
    name: '',
  };

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
      addChannel(values)
        .unwrap()
        .then(() => {
          closeHandler(formik);
        })
        .catch(() => {
          formik.errors.name = 'Ошибка сети';
        });
    },
  });

  return (
    <Modal show={isOpened} onHide={() => closeHandler(formik)}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group has-validation="true">
            <Form.Control
              id="name"
              type="text"
              placeholder="Введите название"
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={!!formik.errors.name}
              autoFocus
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => closeHandler(formik)}>
          Отмена
        </Button>
        <Button
          variant="primary"
          disabled={isLoadingAdd || isLoadingGet}
          onClick={formik.handleSubmit}
        >
          { isLoadingAdd ? 'Отправка' : 'Отправить'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModal;
