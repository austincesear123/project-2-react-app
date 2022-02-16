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

  function addToTLTList(title, thumb, url, style) {
    const tltListCopy = [...tltList];
    const releaseToAdd = { title: title, thumb: thumb, url: url, style: style };
    tltListCopy.push(releaseToAdd);
    setTLTlist(tltListCopy);
    window.alert("Added to list");
  }

  function addToLTList(title, thumb, url, style, index) {
    const tltListCopy = [...tltList];
    tltListCopy.splice(index, 1);
    setTLTlist(tltListCopy);
    const ltListCopy = [...ltList];
    const releaseToAdd = { title: title, thumb: thumb, url: url, style: style };
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
        <img src={release.thumb} alt="thumbnail" />
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
      <img src={result.thumb} alt="thumbnail" />
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
            result.thumb,
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
    </li>
  ));

  let displayList;
  if (listDisplayToggle === "tlt") {
    displayList = displayTLTList;
  } else {
    displayList = displayLTList;
  }

  return (
    <div className="App">
      <Navbar setListDisplayToggle={setListDisplayToggle} />
      <Main
        searchQuery={searchQuery}
        dataForPagination={dataForPagination}
        displaySearchResults={displaySearchResults}
        displayList={displayList}
        displayTLTList={displayTLTList}
        exploreListForDashboard={exploreListForDashboard}
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
