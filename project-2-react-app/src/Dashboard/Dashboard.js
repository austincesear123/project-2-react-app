import { Link } from "react-router-dom";

const Dashboard = ({ displayTLTList, exploreListForDashboard }) => {
  let slicedDisplayTLTList;
  if (displayTLTList.length > 5) {
    slicedDisplayTLTList = displayTLTList.slice(0, 5);
  } else {
    slicedDisplayTLTList = displayTLTList;
  }
  return (
    <>
      <h1>Dashboard</h1>
      <article>
        <h2>T-L-T List</h2>
        <ul>
          {displayTLTList.length > 5
            ? displayTLTList.slice(0, 5)
            : displayTLTList}
        </ul>
        <Link to="/tlt-list">
          <button>See More</button>
        </Link>
      </article>
      <article>
        <h2>Explore</h2>
        <ul>{exploreListForDashboard}</ul>
        <Link to="/explore">
          <button>See More</button>
        </Link>
      </article>
      <article>
        <h2>Friends</h2>
        <button>See More</button>
      </article>
    </>
  );
};

export default Dashboard;
