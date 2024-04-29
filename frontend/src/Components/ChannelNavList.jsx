import {
  Button,
  ButtonGroup,
  Dropdown,
  Nav,
  Placeholder,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useGetChannelsQuery } from '../store/slices/channels';
import { open } from '../store/slices/modal';
import {
  getDefaultSelectedId,
  getSelectedId,
  select,
} from '../store/slices/selected';

const ChannelNavItem = ({
  title,
  id,
  removable,
}) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const selected = useSelector(getSelectedId);

  const isCurrentSelected = selected === id;
  const getVariant = () => (isCurrentSelected ? 'secondary' : null);

  const selectHandler = () => {
    dispatch(select({ id }));
  };

  const removeHandler = () => {
    dispatch(open(`remove-${id}`));
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
          <Dropdown.Item onClick={editHandler}>{t('channelNavList.item.menu.edit')}</Dropdown.Item>
          <Dropdown.Item onClick={removeHandler}>{t('channelNavList.item.menu.remove')}</Dropdown.Item>
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
  const selectedId = useSelector(getSelectedId);
  const defaultSelectedId = useSelector(getDefaultSelectedId);

  const dispatch = useDispatch();

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

  const selectedChannel = data.find((channel) => channel.id === selectedId);

  if (!selectedChannel) {
    dispatch(select({ id: defaultSelectedId }));
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
