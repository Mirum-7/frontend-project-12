import { useEffect } from 'react';
import {
  Button,
  ButtonGroup,
  Dropdown,
  Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../socket';
import baseApi from '../store/slices/baseApi';
import { useGetChannelsQuery } from '../store/slices/channels';
import { open } from '../store/slices/modal';
import {
  getDefaultSelectedId,
  getSelectedId,
  select,
} from '../store/slices/selected';
import filter from '../wordFilter';

const ChannelButton = ({
  variant,
  title,
  handler,
  role,
}) => (
  <Button
    variant={variant}
    onClick={handler}
    className="w-100 rounded-0 text-start text-truncate"
    role={role}
  >
    {`# ${title}`}
  </Button>
);

const ChannelNavItem = ({
  title,
  id,
  removable,
}) => {
  const { t } = useTranslation();

  const cleanedTitle = filter.clean(title);

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
      <ChannelButton
        title={cleanedTitle}
        variant={getVariant()}
        handler={selectHandler}
        role={title}
      />
    );
  } else {
    button = (
      <Dropdown as={ButtonGroup} className="w-100">
        <ChannelButton
          title={cleanedTitle}
          variant={getVariant()}
          handler={selectHandler}
          role={cleanedTitle}
        />
        <Dropdown.Toggle variant={getVariant()} split>
          <span className="visually-hidden">Управление каналом</span>
        </Dropdown.Toggle>
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
  } = useGetChannelsQuery();

  const selectedChannel = data?.find((channel) => channel.id === selectedId);
  useEffect(() => {
    if (!selectedChannel) {
      dispatch(select({ id: defaultSelectedId }));
    }
  }, [data]);

  useEffect(() => {
    const onAddChannel = (channel) => {
      dispatch(
        baseApi.util.updateQueryData('getChannels', undefined, (draft) => {
          draft.push(channel);
        }),
      );
    };

    const onRemoveChannel = (target) => {
      dispatch(
        baseApi.util.updateQueryData('getChannels', undefined, (draft) => {
          const pos = draft.map((channel) => channel.id).indexOf(target.id);
          draft.splice(pos, 1);
        }),
      );
    };

    const onEditChannel = (target) => {
      dispatch(
        baseApi.util.updateQueryData('getChannels', undefined, (draft) => {
          const pos = draft.map((channel) => channel.id).indexOf(target.id);
          draft[pos] = target;
          console.log(draft);
        }),
      );
    };

    socket.on('newChannel', onAddChannel);
    socket.on('removeChannel', onRemoveChannel);
    socket.on('renameChannel', onEditChannel);

    return () => {
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, []);

  const items = data?.map((channel) => (
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
