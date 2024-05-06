import SocketContext from '../contexts/socket';

const SocketProvider = ({ children, socket }) => (
  <SocketContext.Provider value={socket}>
    {children}
  </SocketContext.Provider>
);

export default SocketProvider;
