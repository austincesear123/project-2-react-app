const Explore = ({
  searchQuery,
  dataForPagination,
  displaySearchResults,
  handleChange,
  handleSubmit,
  handleNextPageFetch,
  handleLastPageFetch
}) => {
  let nextAndLastPageButtons;
  if(dataForPagination.pages > 1){
    if(dataForPagination.page === 1){
      nextAndLastPageButtons = <button onClick={handleNextPageFetch}>Next Page</button>
    } else if(dataForPagination.page > 1){
      nextAndLastPageButtons = <><button onClick={handleLastPageFetch}>Last Page</button><button onClick={handleNextPageFetch}>Next Page</button></>
    }
  }

  return (
    <>
      <h1>Explore</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="artistSearch"
          placeholder="Artist"
          type="text"
          value={searchQuery.artist}
          onChange={handleChange}
        />
        <input
          id="albumSearch"
          placeholder="Album"
          type="text"
          value={searchQuery.album}
          onChange={handleChange}
        />
        <input
          id="genreSearch"
          placeholder="Genre"
          type="text"
          value={searchQuery.genre}
          onChange={handleChange}
        />
        <button>Search</button>
      </form>
      <ul>{displaySearchResults}</ul>
      {nextAndLastPageButtons}
    </>
  );
};

export default Explore;
