import './index.css';

const Window = ({ children, width }) => (
  <div
    className="window"
    style={{
      width,
    }}
  >
    {children}
  </div>
);

export default Window;
