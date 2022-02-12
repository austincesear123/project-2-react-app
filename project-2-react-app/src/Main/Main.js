import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Explore from "../Explore/Explore";
import TLTList from "../TLTList/TLTList";

const Main = ({ searchQuery, displaySearchResults, handleChange, handleSubmit }) => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route
          path="/explore"
          element={
            <Explore
              searchQuery={searchQuery}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              displaySearchResults={displaySearchResults}
            />
          }
        />
        <Route path="/tlt-list" element={<TLTList />} />
      </Routes>
    </main>
  );
};

export default Main;
