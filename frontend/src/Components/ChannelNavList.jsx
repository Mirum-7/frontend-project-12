import {
  Button,
  ButtonGroup,
  Dropdown,
  Nav,
  Placeholder,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedId, select } from '../store/slices/selected';
import { useGetChannelsQuery, useRemoveChannelMutation } from '../store/slices/channels';
import { open } from '../store/slices/modal';

const ChannelNavItem = ({
  title,
  id,
  removable,
}) => {
  const dispatch = useDispatch();

  const selected = useSelector(getSelectedId);
  const getVariant = () => (selected === id ? 'secondary' : null);

  const selectHandler = () => dispatch(select({ id, name: title }));

  const [
    removeChannel,
  ] = useRemoveChannelMutation();

  const removeHandler = () => {
    removeChannel(id);
  };

  const editHandler = () => {
    dispatch(open(`edit-${id}`));
  };

  let button;

  if (!removable) {
    button = (
      <Button variant={getVariant()} onClick={selectHandler} className="w-100 text-start text-truncate">
        {`# ${title}`}
      </Button>
    );
  } else {
    button = (
      <Dropdown as={ButtonGroup} className="w-100">
        <Button variant={getVariant()} onClick={selectHandler} className="w-100 text-truncate text-start">
          {`# ${title}`}
        </Button>
        <Dropdown.Toggle variant={getVariant()} split />
        <Dropdown.Menu>
          <Dropdown.Item onClick={editHandler}>Редактировать</Dropdown.Item>
          <Dropdown.Item onClick={removeHandler}>Удалить</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  return (
    <Nav.Item className="w-100">
      {button}
    </Nav.Item>
  );
};

const ChannelNavList = () => {
  const {
    data,
    isLoading,
    isError,
  } = useGetChannelsQuery();

  if (isError) {
    return null;
  }

  if (isLoading) {
    return (
      <Nav className="flex-column align-items-stretch px-3 gap-1 d-block">
        <Placeholder.Button variant="secondary" className="w-100" />
      </Nav>
    );
  }

  const items = data.map((channel) => (
    <ChannelNavItem
      key={channel.id}
      id={channel.id}
      title={channel.name}
      removable={channel.removable}
    />
  ));

  return (
    <Nav className="flex-column align-items-stretch px-3 gap-1">
      {items}
    </Nav>
  );
};

export default ChannelNavList;
