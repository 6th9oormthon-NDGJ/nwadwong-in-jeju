import { useNavigate } from 'react-router-dom';

const Redirect = () => {
  const navigate = useNavigate();
  navigate('/home');
  return <></>;
};

export default Redirect;
