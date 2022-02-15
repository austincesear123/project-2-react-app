import { Link } from "react-router-dom";

const Navbar = ({ setListDisplayToggle }) => {
  return (
    <nav>
      <Link to="/" onClick={() => setListDisplayToggle("tlt")}>
        Queue-Tip
      </Link>
      <Link to="/explore">Explore</Link>
      <Link to="/tlt-list">T-L-T List</Link>
    </nav>
  );
};

export default Navbar;
