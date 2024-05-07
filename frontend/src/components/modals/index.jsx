import { useSelector } from 'react-redux';
import { getOpened, getType } from '../../store/slices/modal';
import AddModal from './add';
import EditModal from './edit';
import RemoveModal from './remove';

const modals = {
  add: AddModal,
  edit: EditModal,
  remove: RemoveModal,
};

const RenderModals = () => {
  const isOpened = useSelector(getOpened);

  const type = useSelector(getType);
  const [status, data] = type.split('-');

  if (!isOpened) {
    return null;
  }

  const Component = modals[status];
  return <Component isOpened={isOpened} id={data} />;
};

export default RenderModals;
