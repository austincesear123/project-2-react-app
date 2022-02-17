import "./App.css";
// import { Route, Link, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import discogsToken from "./discogsToken";
import Main from "./Main/Main";
import Navbar from "./Navbar/Navbar";
import { initialTLTList, initialLTList } from "./initialData";

function App() {
  const [searchQuery, setSearchQuery] = useState({
    artist: "",
    album: "",
    genre: "",
  });
  const [dataFromSearch, setDataFromSearch] = useState([]);
  const [dataForPagination, setDataForPagination] = useState({});
  const [tracklists, setTracklists] = useState([]);
  const [tracklistDisplayToggle, setTracklistDisplayToggle] = useState(false);
  const [displayIndex, setDisplayIndex] = useState("");

  const [dataForDashboardExplore, setDataForDashboardExplore] = useState([]);

  const [tltList, setTLTlist] = useState(initialTLTList);
  const [ltList, setLTList] = useState(initialLTList);
  const [listDisplayToggle, setListDisplayToggle] = useState("tlt");

  function handleChange(event) {
    if (event.target.id === "artistSearch") {
      setSearchQuery({ ...searchQuery, artist: event.target.value });
    } else if (event.target.id === "albumSearch") {
      setSearchQuery({ ...searchQuery, album: event.target.value });
    } else if (event.target.id === "genreSearch") {
      setSearchQuery({ ...searchQuery, genre: event.target.value });
    }
  }

  const determineSearchURL = (obj) => {
    if (obj.artist !== "") {
      if (obj.album !== "") {
        if (obj.genre !== "") {
          return `https://api.discogs.com/database/search?artist=${obj.artist}&release_title=${obj.album}&genre=${obj.genre}&type=master&per_page=20&token=${discogsToken}`;
        }
      } else {
        return `https://api.discogs.com/database/search?artist=${obj.artist}&release_title=${obj.album}&type=master&per_page=20&token=${discogsToken}`;
      }
      return `https://api.discogs.com/database/search?artist=${obj.artist}&type=master&token=${discogsToken}`;
    } else if (obj.album !== "") {
      if (obj.genre !== "") {
        return `https://api.discogs.com/database/search?release_title=${obj.album}&genre=${obj.genre}&type=master&per_page=20&token=${discogsToken}`;
      }
      return `https://api.discogs.com/database/search?release_title=${obj.album}&type=master&per_page=20&token=${discogsToken}`;
    } else if (obj.genre !== "") {
      return `https://api.discogs.com/database/search?style=${obj.genre}&type=master&per_page=20&token=${discogsToken}`;
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    const tracklistsCopy = [];

    fetch(determineSearchURL(searchQuery))
      .then((response) => response.json())
      .then((data) => {
        setDataFromSearch(data.results);
        setDataForPagination(data.pagination);
        return data;
      })
      .then((data) => {
        data.results.forEach((e) => {
          fetch(`${e.resource_url}?token=${discogsToken}`)
            .then((response) => response.json())
            .then((data) => {
              tracklistsCopy.push(data.tracklist);
            })
            .catch((error) => console.log(error));
        });
      })
      .then(() => setTracklists(tracklistsCopy))
      .then(() =>
        setSearchQuery({
          artist: "",
          album: "",
          genre: "",
        })
      )
      .catch((error) => console.log(error));
  }

  function handleExploreSeeMore() {
    const style = ltList[0].style[0];
    const url = `https://api.discogs.com/database/search?style=${style}&per_page=20&token=${discogsToken}`;
    const tracklistsCopy = [];

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setDataFromSearch(data.results);
        setDataForPagination(data.pagination);
        return data;
      })
      .then((data) => {
        data.results.forEach((e) => {
          fetch(`${e.resource_url}?token=${discogsToken}`)
            .then((response) => response.json())
            .then((data) => {
              tracklistsCopy.push(data.tracklist);
            })
            .catch((error) => console.log(error));
        });
      })
      .then(() => setTracklists(tracklistsCopy))
      .then(() =>
        setSearchQuery({
          artist: "",
          album: "",
          genre: "",
        })
      )
      .catch((error) => console.log(error));
  }

  function handleNextPageFetch() {
    const url = dataForPagination.urls.next;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setDataFromSearch(data.results);
        setDataForPagination(data.pagination);
      })
      .then(window.scrollTo(0, 0))
      .catch((error) => console.log(error));
  }

  function handleLastPageFetch() {
    const url = dataForPagination.urls.prev;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setDataFromSearch(data.results);
        setDataForPagination(data.pagination);
      })
      .then(window.scrollTo(0, 0))
      .catch((error) => console.log(error));
  }

  function addToTLTList(title, cover_image, url, style) {
    const tltListCopy = [...tltList];
    const releaseToAdd = {
      title: title,
      cover_image: cover_image,
      url: url,
      style: style,
    };
    tltListCopy.push(releaseToAdd);
    setTLTlist(tltListCopy);
    window.alert("Added to list");
  }

  function addToLTList(title, cover_image, url, style, index) {
    const tltListCopy = [...tltList];
    tltListCopy.splice(index, 1);
    setTLTlist(tltListCopy);
    const ltListCopy = [...ltList];
    const releaseToAdd = {
      title: title,
      cover_image: cover_image,
      url: url,
      style: style,
    };
    ltListCopy.unshift(releaseToAdd);
    setLTList(ltListCopy);
  }

  // function pushTracklistData(tracklist) {
  //   const dataForTracklistCopy = [...dataForTracklist];
  //   dataForTracklistCopy.push(tracklist);
  //   setDataForTracklist(dataForTracklistCopy);
  // }

  function toggleTracklistDisplay(index) {
    if (tracklistDisplayToggle) {
      setTracklistDisplayToggle(false);
      setDisplayIndex("");
    } else {
      setTracklistDisplayToggle(true);
      setDisplayIndex(index);
    }
  }

  useEffect(() => {
    if (ltList.length > 0) {
      const style = ltList[0].style[0];
      const url = `https://api.discogs.com/database/search?style=${style}&per_page=5&token=${discogsToken}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => setDataForDashboardExplore(data.results))
        .catch((error) => console.log(error));
    }
  }, [ltList[0]]);

  let exploreListForDashboard;
  if (ltList.length > 0) {
    exploreListForDashboard = dataForDashboardExplore.map((release, index) => (
      <li key={index}>
        <img
          className="dashboard-image"
          src={release.cover_image}
          alt="cover_image"
        />
        {release.title}
      </li>
    ));
  }

  let displayTracklist;
  // if (tracklistDisplayToggle) {
  //   displayTracklist = dataForTracklist.map((track, index) => (
  //     <li key={index}>{track.title}</li>
  //   ));
  // }

  // if (dataFromSearch.length > 0) {
  //   let tracklistsAddedToSearchData = [...dataFromSearch];
  //   dataFromSearch.forEach((result, index) => {
  //     const dataToAdd = { ...result, tracklist: tracklists[index] };
  //     tracklistsAddedToSearchData.splice(index, 1, dataToAdd);
  //   });
  //   setFullSearchData(tracklistsAddedToSearchData);
  //   let mappedTracklists = [];
  //   fullSearchData.forEach((result) => {
  //     let mappedTracklist = result.tracklist?.map((track, index) => (
  //       <li key={index}>{track.title}</li>
  //     ));
  //     mappedTracklists.push(mappedTracklist);
  //   });
  //   fullSearchData.forEach((result, index) => {
  //     const dataToAdd = { ...result, tracklist: mappedTracklists[index] };
  //     tracklistsAddedToSearchData.splice(index, 1, dataToAdd);
  //   });
  //   console.log(mappedTracklists);
  //   setFullSearchData(tracklistsAddedToSearchData);
  // }

  const displaySearchResults = dataFromSearch.map((result, index) => (
    <li key={index}>
      <img src={result.cover_image} alt="cover_image" />
      {result.title}
      <ul>
        <li>Label: {result.label[0]}</li>
        <li>Year: {result.year}</li>
        <li>Style: {result.style[0]}</li>
      </ul>
      <button onClick={() => toggleTracklistDisplay(index)}>
        {displayIndex === index ? "Hide Tracklist" : "Display Tracklist"}
      </button>
      <ol className={displayIndex === index ? "active" : "inactive"}>
        {tracklists[index]?.map((track, index) => (
          <li key={index}>{track.title}</li>
        ))}
      </ol>
      <button
        onClick={() =>
          addToTLTList(
            result.title,
            result.cover_image,
            result.resource_url,
            result.style
          )
        }
      >
        Add to List
      </button>
    </li>
  ));

  const displayTLTList = tltList.map((release, index) => (
    <li key={index}>
      <img src={release.thumb} alt="thumbnail" />
      {release.title}
      <button onClick={() => toggleTracklistDisplay(index)}>
        {displayIndex === index ? "Hide Tracklist" : "Display Tracklist"}
      </button>
      <ol className={displayIndex === index ? "active" : "inactive"}>
        {release.tracklist?.map((track, index) => (
          <li key={index}>{track.title}</li>
        ))}
      </ol>
      <button
        onClick={() =>
          addToLTList(
            release.title,
            release.thumb,
            release.url,
            release.style,
            index
          )
        }
      >
        Listened To
      </button>
    </li>
  ));

  const displayLTList = ltList.map((release, index) => (
    <li key={index}>
      <img src={release.cover_image} alt="cover_image" />
      {release.title}
      <button onClick={() => toggleTracklistDisplay(index)}>
        {displayIndex === index ? "Hide Tracklist" : "Display Tracklist"}
      </button>
      <ol className={displayIndex === index ? "active" : "inactive"}>
        {release.tracklist?.map((track, index) => (
          <li key={index}>{track.title}</li>
        ))}
      </ol>
    </li>
  ));

  let displayList;
  if (listDisplayToggle === "tlt") {
    displayList = displayTLTList;
  } else {
    displayList = displayLTList;
  }

  const displayDashboardTLTList = tltList.map((release, index) => (
    <div
      className="col"
      key={index}
      data-bs-toggle="modal"
      data-bs-target={`#modal${index}`}
    >
      <div className="d-flex">
        <img
          className="dashboard-image"
          src={release.cover_image}
          alt="cover_image"
        />
        <div className="card sub-card">
          <div className="card-body d-flex align-items-center">
            <div className="card-text sub-card-title">{release.title}</div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id={`modal${index}`}
        tabIndex="-1"
        aria-labelledby={`modal${index}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Mark "{release.title}" as Listened-To?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-dark"
                onClick={() =>
                  addToLTList(
                    release.title,
                    release.cover_image,
                    release.url,
                    release.style,
                    index
                  )
                }
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-dark"
                data-bs-dismiss="modal"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  {
    /* <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => toggleTracklistDisplay(index)}
          >
            {displayIndex === index ? "Hide Tracklist" : "Display Tracklist"}
          </button> */
  }
  {
    /* <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() =>
              addToLTList(
                release.title,
                release.cover_image,
                release.url,
                release.style,
                index
              )
            }
          >
            Listened To
          </button> */
  }
  {
    /* <div className="accordion" id="tracklist">
            <div className="accordion-item">
              <h2 className="accordion-header" id={`tracklist-header-${index}`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded="false"
                  aria-controls={`collapse${index}`}
                >
                  Display Tracklist
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`tracklist-header-${index}`}
                data-bs-parent="#tracklist"
              >
                <div className="accordion-body">
                  <ol>
                    {release.tracklist?.map((track, index) => (
                      <li key={index}>{track.title}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div> */
  }
  {
    /* <ol className={displayIndex === index ? "active" : "inactive"}>
          {release.tracklist?.map((track, index) => (
            <li key={index}>{track.title}</li>
          ))}
        </ol> */
  }

  const displayDashboardExplore = (
    <>
      <h6 className="card-title">More {ltList[0].style[0]}</h6>
      <div className="list-group list-group-flush text-start">
        <li className="list-group-item text-truncate dashboard-explore-list">
          <img
            className="dashboard-explore-image"
            src={dataForDashboardExplore[0]?.cover_image}
            alt="cover_image"
          />
          {dataForDashboardExplore[0]?.title}
        </li>
        <li className="list-group-item text-truncate dashboard-explore-list">
          <img
            className="dashboard-explore-image"
            src={dataForDashboardExplore[1]?.cover_image}
            alt="cover_image"
          />
          {dataForDashboardExplore[1]?.title}
        </li>
        <li className="list-group-item text-truncate dashboard-explore-list">
          <img
            className="dashboard-explore-image"
            src={dataForDashboardExplore[2]?.cover_image}
            alt="cover_image"
          />
          {dataForDashboardExplore[2]?.title}
        </li>
        <li className="list-group-item text-truncate dashboard-explore-list">
          <img
            className="dashboard-explore-image"
            src={dataForDashboardExplore[3]?.cover_image}
            alt="cover_image"
          />
          {dataForDashboardExplore[3]?.title}
        </li>
        <li className="list-group-item text-truncate dashboard-explore-list">
          <img
            className="dashboard-explore-image"
            src={dataForDashboardExplore[4]?.cover_image}
            alt="cover_image"
          />
          {dataForDashboardExplore[4]?.title}
        </li>
      </div>
    </>
  );

  return (
    <div className="App font-monospace">
      <Navbar setListDisplayToggle={setListDisplayToggle} />
      <Main
        searchQuery={searchQuery}
        dataForPagination={dataForPagination}
        displaySearchResults={displaySearchResults}
        displayList={displayList}
        displayDashboardTLTList={displayDashboardTLTList}
        displayDashboardExplore={displayDashboardExplore}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleNextPageFetch={handleNextPageFetch}
        handleLastPageFetch={handleLastPageFetch}
        handleExploreSeeMore={handleExploreSeeMore}
        setListDisplayToggle={setListDisplayToggle}
      />
    </div>
  );
}

export default App;
