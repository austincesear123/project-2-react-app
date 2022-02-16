import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = ({
  displayTLTList,
  exploreListForDashboard,
  handleExploreSeeMore,
}) => {
  let slicedDisplayTLTList;
  if (displayTLTList.length > 5) {
    slicedDisplayTLTList = displayTLTList.slice(0, 5);
  } else {
    slicedDisplayTLTList = displayTLTList;
  }
  return (
    <>
      <h1>Dashboard</h1>
      <article className="container card">
        <div className="row justify-content-center">
            <h2 className="col-4">T-L-T List</h2>
        </div>
        <ul className="row">
          {displayTLTList.length > 5
            ? displayTLTList.slice(0, 5)
            : displayTLTList}
        </ul>
        <div className="row justify-content-center">
          <div className="col-4">
            <Link to="/tlt-list">
              <button type="button" className="btn btn-primary btn-sm">
                See More
              </button>
            </Link>
          </div>
        </div>
      </article>
      <article className="container card">
        <h2>Explore</h2>
        <ul>{exploreListForDashboard}</ul>
        <Link to="/explore" onClick={handleExploreSeeMore}>
          <button type="button" className="btn btn-primary btn-sm">
            See More
          </button>
        </Link>
      </article>
      <article className="container card">
        <h2>Friends</h2>
        <button type="button" className="btn btn-primary btn-sm">
          See More
        </button>
      </article>
    </>
  );
};

export default Dashboard;
