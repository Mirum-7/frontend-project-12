import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { object, string } from 'yup';
import { useAddChannelMutation, useGetChannelsQuery } from '../../store/slices/channels';
import {
  close,
  getOpened,
  getType,
} from '../../store/slices/modal';

const AddModal = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const status = useSelector(getOpened);
  const type = useSelector(getType);

  const isOpened = status && type === 'add';
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [isOpened]);

  const [
    addChannel,
    { isLoading: isLoadingAdd },
  ] = useAddChannelMutation();
  const { data, isLoading: isLoadingGet, isError: isErrorGet } = useGetChannelsQuery();

  const names = (!isLoadingGet && !isErrorGet) ? data.map((channel) => channel.name) : [];

  const closeHandler = (formik) => {
    dispatch(close());
    formik.resetForm();
  };

  const initialValues = {
    name: '',
  };

  const shceme = object().shape({
    name: string()
      .required(t('modals.validation.required'))
      .min(3, t('modals.validation.min'))
      .max(20, t('modals.validation.max'))
      .notOneOf(names, t('modals.validation.notOneOf')),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: shceme,
    onSubmit: (values) => {
      addChannel(values)
        .unwrap()
        .then(() => {
          toast.success(t('toast.success.addChannel'));
          closeHandler(formik);
        })
        .catch(() => {
          formik.errors.name = t('errors.network');
        });
    },
  });

  return (
    <Modal show={isOpened} onHide={() => closeHandler(formik)}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.add.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group has-validation="true" className="mb-3">
            <Form.Control
              id="name"
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

export default AddModal;