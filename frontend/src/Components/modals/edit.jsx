import { useFormik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { object, string } from 'yup';
import { useEditChannelMutation, useGetChannelsQuery } from '../../store/slices/channels';
import { close, getOpened, getType } from '../../store/slices/modal';

const EditModal = () => {
  const { t } = useTranslation();

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
      .required(t('modals.validation.required'))
      .min(3, t('modals.validation.min'))
      .max(20, t('modals.validation.max'))
      .notOneOf(names, t('modals.validation.notOneOf')),
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
          formik.errors.name = t('errors.network');
        });
    },
  });

  return (
    <Modal show={isOpened} onHide={() => closeHandler(formik)}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.edit.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group has-validation="true">
            <Form.Control
              id="name"
              type="text"
              placeholder={t('modals.placeholders.name')}
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
          {t('modals.buttons.close')}
        </Button>
        <Button
          variant="primary"
          disabled={isLoadingAdd || isLoadingGet}
          onClick={formik.handleSubmit}
        >
          { isLoadingAdd ? t('modals.buttons.loading') : t('modals.buttons.submit')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
