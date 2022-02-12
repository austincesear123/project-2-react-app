const Explore = ({
  searchQuery,
  displaySearchResults,
  handleChange,
  handleSubmit,
}) => {
  return (
    <>
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
    </>
  );
};

export default Explore;
