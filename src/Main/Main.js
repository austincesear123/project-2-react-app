import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Explore from "../Explore/Explore";
import TLTList from "../TLTList/TLTList";

const Main = ({
  searchQuery,
  dataForPagination,
  displaySearchResults,
  displayList,
  displayDashboardTLTList,
  displayDashboardExplore,
  handleChange,
  handleSubmit,
  handleNextPageFetch,
  handleLastPageFetch,
  handleExploreSeeMore,
  setListDisplayToggle,
}) => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Dashboard displayDashboardTLTList={displayDashboardTLTList} displayDashboardExplore={displayDashboardExplore} handleExploreSeeMore={handleExploreSeeMore} />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route
          path="/explore"
          element={
            <Explore
              dataForPagination={dataForPagination}
              searchQuery={searchQuery}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleNextPageFetch={handleNextPageFetch}
              handleLastPageFetch={handleLastPageFetch}
              displaySearchResults={displaySearchResults}
            />
          }
        />
        <Route
          path="/tlt-list"
          element={
            <TLTList
              displayList={displayList}
              setListDisplayToggle={setListDisplayToggle}
            />
          }
        />
      </Routes>
    </main>
  );
};

export default Main;
