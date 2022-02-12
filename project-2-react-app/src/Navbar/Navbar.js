import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">App Name</Link>
      <Link to="/explore">Explore</Link>
      <Link to="/tlt-list">T-L-T List</Link>
    </nav>
  );
};

export default Navbar;
