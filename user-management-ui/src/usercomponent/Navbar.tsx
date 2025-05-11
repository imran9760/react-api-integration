import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-default">
      <Link to="/login">Login</Link>
      <Link to="/userDetails">User Details</Link>
      <Link to="/adduser">AddUser</Link>
      <Link to="/logout">Logout</Link>
    </nav>
  );
};

export default Navbar;
