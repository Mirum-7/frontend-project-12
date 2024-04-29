import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { close, getOpened, getType } from '../../store/slices/modal';

const ErrorModal = () => {
  const dispatch = useDispatch();
  const status = useSelector(getOpened);
  const type = useSelector(getType);

  const isOpened = status && type === 'error';

  const closeHandler = () => dispatch(close());

  return (
    <Modal show={isOpened} onHide={closeHandler} size="sm">
      <Modal.Body>
        <p className="text-danger text-center fs-5 m-0">Ошибка сети</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeHandler}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
