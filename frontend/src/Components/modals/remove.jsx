import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useRemoveChannelMutation } from '../../store/slices/channels';
import { close, getOpened, getType } from '../../store/slices/modal';

const RemoveModal = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const status = useSelector(getOpened);
  const [type, id] = useSelector(getType).split('-');

  const [
    removeChannel,
  ] = useRemoveChannelMutation();

  const [error, setError] = useState();
  const isOpened = status && type === 'remove';

  const closeHandler = () => {
    dispatch(close());
    setError(null);
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
          onClick={() => {
            removeChannel(id)
              .unwrap()
              .then(() => {
                closeHandler();
              })
              .catch(() => {
                setError(t('errors.network'));
              });
          }}
        >
          {t('modals.remove.submit')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveModal;
