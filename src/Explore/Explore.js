import "./Explore.css";

const Explore = ({
  searchQuery,
  dataForPagination,
  displaySearchResults,
  handleChange,
  handleSubmit,
  handleNextPageFetch,
  handleLastPageFetch,
}) => {
  let nextAndLastPageButtons;
  if (dataForPagination.pages > 1) {
    if (dataForPagination.page === 1) {
      nextAndLastPageButtons = (
        <button className="btn btn-dark" onClick={handleNextPageFetch}>
          Next Page
        </button>
      );
    } else if (dataForPagination.page > 1) {
      nextAndLastPageButtons = (
        <>
          <button className="btn btn-dark" onClick={handleLastPageFetch}>
            Last Page
          </button>
          <button className="btn btn-dark" onClick={handleNextPageFetch}>
            Next Page
          </button>
        </>
      );
    }
  }

  return (
    <>
        <form className="explore-form" onSubmit={handleSubmit}>
          <input
            id="artistSearch"
            placeholder="Artist"
            type="text"
            className="form-control"
            value={searchQuery.artist}
            onChange={handleChange}
          />
          <input
            id="albumSearch"
            placeholder="Album"
            type="text"
            className="form-control"
            value={searchQuery.album}
            onChange={handleChange}
          />
          <input
            id="genreSearch"
            placeholder="Genre"
            type="text"
            className="form-control"
            value={searchQuery.genre}
            onChange={handleChange}
          />
          <div className="text-center">
            <button type="submit" className="btn btn-dark">
              Search
            </button>
          </div>
        </form>
      <div className="d-flex justify-content-center">
        <ul className="explore-results-list">{displaySearchResults}</ul>
      </div>
      <div className="text-center">{nextAndLastPageButtons}</div>
    </>
  );
};

export default Explore;
