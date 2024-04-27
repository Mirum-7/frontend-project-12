import { useFormik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { object, string } from 'yup';
import { close, getOpened, getType } from '../../store/slices/modal';
import { useEditChannelMutation, useGetChannelsQuery } from '../../store/slices/channels';

const EditModal = () => {
  const dispatch = useDispatch();
  const status = useSelector(getOpened);
  const [type, id] = useSelector(getType).split('-');

  const [
    editChannel,
    { isLoading: isLoadingAdd },
  ] = useEditChannelMutation();
  const { data, isLoading: isLoadingGet, isError: isErrorGet } = useGetChannelsQuery();

  let names = [];
  if (!isLoadingGet && !isErrorGet) {
    names = data.map((channel) => channel.name);
  }

  const isOpened = status && type === 'edit';

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
      editChannel({ id, channel: values })
        .unwrap()
        .then(() => {
          formik.resetForm();
          closeHandler();
        })
        .catch(() => {
          formik.errors.name = 'Ошибка сети';
        });
    },
  });

  return (
    <Modal show={isOpened} onHide={() => closeHandler(formik)}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
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

export default EditModal;
