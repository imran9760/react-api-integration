import { useNavigate } from 'react-router-dom';

const Logout=()=>{
  const navigate = useNavigate();
    navigate('/login')
}
export default Logout
