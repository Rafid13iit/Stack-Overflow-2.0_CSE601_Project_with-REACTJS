import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner
        animation="border"
        role="status"
        className="text-blue-500"
        style={{
          width: '80px',
          height: '80px',
          borderWidth: '6px',
        }}
      />
    </div>
  );
};

export default Loader;
