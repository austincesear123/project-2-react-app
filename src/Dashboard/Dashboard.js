import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = ({
  displayDashboardTLTList,
  displayDashboardExplore,
  handleExploreSeeMore,
}) => {
  return (
    <div className="container dashboard-container">
      <div className="row row-cols-1 row-cols-md-2">
        <div className="col col-lg-5 d-flex justify-content-center align-items-center">
          <h1 className="text-center welcome-back display-6">Welcome Back</h1>
        </div>
        <div className="col col-lg-7">
          <article className="dashboard-cards tlt-card card text-center">
            <div className="card-body">
              <h2 className="card-title display-6">T-L-T List</h2>
            </div>
            <div className="row row-cols-sm-2 row-cols-md-1 g-1">
              {displayDashboardTLTList?.length > 4
                ? displayDashboardTLTList.slice(0, 4)
                : displayDashboardTLTList}
            </div>
            <div className="card-body dashboard-card-footer">
              <Link to="/tlt-list">
                <button
                  type="button"
                  className="btn btn-dark btn-sm see-more-btn"
                >
                  See More
                </button>
              </Link>
            </div>
          </article>
        </div>
        <div className="col col-lg-8">
          <article className="dashboard-cards card text-center">
            <div className="card-body">
              <h2 className="card-title display-6">Explore</h2>
            </div>
            {displayDashboardExplore}
            <div className="card-body dashboard-card-footer">
              <Link to="/explore" onClick={handleExploreSeeMore}>
                <button
                  type="button"
                  className="btn btn-dark btn-sm see-more-btn"
                >
                  See More
                </button>
              </Link>
            </div>
          </article>
        </div>
        <div className="col col-lg-4">
          <article className="dashboard-cards card text-center">
            <div className="card-body">
              <h2 className="card-title display-6">Friends</h2>
              <button
                type="button"
                className="btn btn-dark btn-sm see-more-btn"
              >
                See More
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
