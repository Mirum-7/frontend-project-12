import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { object, string } from 'yup';
import { useEditChannelMutation, useGetChannelsQuery } from '../../store/slices/channels';
import { close } from '../../store/slices/modal';

const EditModal = ({ id, isOpened }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const ref = useRef();

  const focus = () => {
    if (ref.current) {
      ref.current.focus();
      ref.current.select();
    }
  };

  useEffect(() => {
    focus();
  }, [isOpened]);

  const [
    editChannel,
    { isLoading: isLoadingAdd },
  ] = useEditChannelMutation();
  const { data, isLoading: isLoadingGet, isError: isErrorGet } = useGetChannelsQuery();

  const names = (!isLoadingGet && !isErrorGet) ? data.map((channel) => channel.name) : [];

  const closeHandler = (formik) => {
    dispatch(close());
    formik.resetForm();
  };

  const initialValues = {
    name: '',
  };

  const schema = object().shape({
    name: string()
      .required(t('modals.validation.required'))
      .min(3, t('modals.validation.range'))
      .max(20, t('modals.validation.range'))
      .notOneOf(names, t('modals.validation.notOneOf')),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      editChannel({ id, channel: values })
        .unwrap()
        .then(() => {
          toast.success(t('toast.success.editChannel'));
          closeHandler(formik);
        })
        .catch((e) => {
          formik.errors.name = e.error;
          focus();
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
          <Form.Group has-validation="true" className="mb-3">
            <Form.Label htmlFor="name">{t('modals.labels.name')}</Form.Label>
            <Form.Control
              id="name"
              name="name"
              type="text"
              placeholder={t('modals.placeholders.name')}
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={!!formik.errors.name}
              ref={ref}
              autoFocus
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="justify-content-end d-flex gap-3">
            <Button variant="secondary" onClick={() => closeHandler(formik)}>
              {t('modals.buttons.close')}
            </Button>
            <Button
              variant="primary"
              disabled={isLoadingAdd || isLoadingGet}
              type="submit"
            >
              { isLoadingAdd ? t('modals.buttons.loading') : t('modals.buttons.submit')}
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
