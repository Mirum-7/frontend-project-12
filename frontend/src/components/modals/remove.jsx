import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useRemoveChannelMutation } from '../../store/slices/channels';
import { close } from '../../store/slices/modal';

const RemoveModal = ({ id, isOpened }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [
    removeChannel,
    { error },
  ] = useRemoveChannelMutation();

  const closeHandler = () => {
    dispatch(close());
  };

  const removeHandler = () => {
    removeChannel(id)
      .then(() => {
        closeHandler();
        toast.success(t('toast.success.removeChannel'));
      });
  };

  return (
    <Modal show={isOpened} onHide={closeHandler}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        {error ? <p className="text-danger">{error}</p> : null}
        <Button variant="secondary" onClick={closeHandler}>
          Отмена
        </Button>
        <Button
          variant="danger"
          onClick={removeHandler}
        >
          {t('modals.remove.submit')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveModal;
