import { Link } from "react-router-dom";

const Navbar = ({ setListDisplayToggle }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link
          to="/"
          className="navbar-brand"
          onClick={() => setListDisplayToggle("tlt")}
        >
          Queue-Tip
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/explore" className="nav-link">
                Explore
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/tlt-list"
                className="nav-link"
                onClick={() => setListDisplayToggle("tlt")}
              >
                T-L-T List
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

{
  /* <nav>
  <Link to="/">Queue-Tip</Link>
  <Link to="/explore">Explore</Link>
  <Link to="/tlt-list" onClick={() => setListDisplayToggle("tlt")}>
    T-L-T List
  </Link>
</nav>; */
}
