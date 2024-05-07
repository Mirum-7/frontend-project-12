/* eslint-disable no-param-reassign */
import filter from 'leo-profanity';
import { useEffect } from 'react';
import {
  Button,
  ButtonGroup,
  Dropdown,
  Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import baseApi from '../store/slices/baseApi';
import { useGetChannelsQuery } from '../store/slices/channels';
import { open } from '../store/slices/modal';
import {
  getDefaultSelectedId,
  getSelectedId,
  select,
} from '../store/slices/selected';
import useSocket from '../hooks/socket';
import useAuth from '../hooks/auth';

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
  const variant = isCurrentSelected ? 'secondary' : null;

  const selectHandler = () => {
    dispatch(select({ id }));
  };

  const removeHandler = () => {
    dispatch(open(`remove-${id}`));
  };

  const editHandler = () => {
    dispatch(open(`edit-${id}`));
  };

  if (!removable) {
    return (
      <ChannelButton
        title={cleanedTitle}
        variant={variant}
        handler={selectHandler}
        role={title}
      />
    );
  }
  return (
    <Dropdown as={ButtonGroup} className="w-100">
      <ChannelButton
        title={cleanedTitle}
        variant={variant}
        handler={selectHandler}
        role={cleanedTitle}
      />
      <Dropdown.Toggle variant={variant} split>
        <span className="visually-hidden">{t('channelNavList.item.menu.drop')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={editHandler}>{t('channelNavList.item.menu.edit')}</Dropdown.Item>
        <Dropdown.Item onClick={removeHandler}>{t('channelNavList.item.menu.remove')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const ChannelNavList = () => {
  const selectedId = useSelector(getSelectedId);
  const defaultSelectedId = useSelector(getDefaultSelectedId);

  const dispatch = useDispatch();

  const auth = useAuth();

  const {
    data,
    error,
  } = useGetChannelsQuery();

  useEffect(() => {
    if (
      error
      && error.status === 401
    ) {
      auth.logout();
    }
  }, [error]);

  const selectedChannel = data?.find((channel) => channel.id === selectedId);
  useEffect(() => {
    if (!selectedChannel) {
      dispatch(select({ id: defaultSelectedId }));
    }
  }, [data]);

  const socket = useSocket();

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

  return (
    <Nav className="flex-column align-items-stretch px-3 gap-1">
      {
        data?.map((channel) => (
          <Nav.Item className="w-100" key={channel.id}>
            <ChannelNavItem
              id={channel.id}
              title={channel.name}
              removable={channel.removable}
            />
          </Nav.Item>
        ))
      }
    </Nav>
  );
};

export default ChannelNavList;
