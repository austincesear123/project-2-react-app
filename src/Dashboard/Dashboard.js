import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = ({
  displayDashboardTLTList,
  displayDashboardExplore,
  handleExploreSeeMore,
}) => {
  // let slicedDisplayTLTList;
  // if (displayTLTList.length > 5) {
  //   slicedDisplayTLTList = displayTLTList.slice(0, 5);
  // } else {
  //   slicedDisplayTLTList = displayTLTList;
  // }
  return (
    <>
      <h1>Dashboard</h1>
      <article className="dashboard-cards card text-center container">
        <div className="card-body">
          <h2 className="card-title display-6">T-L-T List</h2>
          <div className="container">
            <div className="row row-cols-2 g-1">
              {displayDashboardTLTList?.length > 4
                ? displayDashboardTLTList.slice(0, 4)
                : displayDashboardTLTList}
            </div>
          </div>
          <Link to="/tlt-list">
            <button type="button" className="btn btn-primary btn-sm">
              See More
            </button>
          </Link>
        </div>
      </article>
      <article className="dashboard-cards card text-center container">
        <div className="card-body">
          <h2 className="card-title display-6">Explore</h2>
        </div>
        {displayDashboardExplore}
        <Link to="/explore" onClick={handleExploreSeeMore}>
          <button type="button" className="btn btn-primary btn-sm">
            See More
          </button>
        </Link>
      </article>
      <article className="container">
        <h2>Friends</h2>
        <button type="button" className="btn btn-primary btn-sm">
          See More
        </button>
      </article>
    </>
  );
};

export default Dashboard;
