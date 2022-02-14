import "./App.css";
import { Route, Link, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import discogsToken from "./discogsToken";
import Main from "./Main/Main";
import Navbar from "./Navbar/Navbar";

function App() {
  const [searchQuery, setSearchQuery] = useState({
    artist: "",
    album: "",
    genre: "",
  });
  const [dataFromSearch, setDataFromSearch] = useState([]);
  const [dataForTracklist, setDataForTracklist] = useState([]);
  const [tracklistDisplayToggle, setTracklistDisplayToggle] = useState(false);

  const [tltList, setTLTlist] = useState([]);
  const [ltList, setLTList] = useState([]);
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
          return `https://api.discogs.com/database/search?artist=${obj.artist}&release_title=${obj.album}&genre=${obj.genre}&per_page=20&token=${discogsToken}`;
        }
      } else {
        return `https://api.discogs.com/database/search?artist=${obj.artist}&release_title=${obj.album}&per_page=20&token=${discogsToken}`;
      }
      return `https://api.discogs.com/database/search?artist=${obj.artist}&per_page=20&token=${discogsToken}`;
    } else if (obj.album !== "") {
      if (obj.genre !== "") {
        return `https://api.discogs.com/database/search?release_title=${obj.album}&genre=${obj.genre}&per_page=20&token=${discogsToken}`;
      }
      return `https://api.discogs.com/database/search?release_title=${obj.album}&per_page=20&token=${discogsToken}`;
    } else if (obj.genre !== "") {
      return `https://api.discogs.com/database/search?style=${obj.genre}&per_page=20&token=${discogsToken}`;
    }
  };

  function handleSubmit(event) {
    event.preventDefault();

    fetch(determineSearchURL(searchQuery))
      .then((response) => response.json())
      .then((data) => setDataFromSearch(data.results))
      .then(() =>
        setSearchQuery({
          artist: "",
          album: "",
          genre: "",
        })
      )
      .catch((error) => console.log(error));
  }

  function addToTLTList(title, thumb) {
    const tltListCopy = [...tltList];
    const releaseToAdd = { title: title, thumb: thumb };
    tltListCopy.push(releaseToAdd);
    setTLTlist(tltListCopy);
    window.alert("Added to list");
  }

  function addToLTList(title, thumb, index) {
    const tltListCopy = [...tltList];
    tltListCopy.splice(index, 1);
    setTLTlist(tltListCopy);
    const ltListCopy = [...ltList];
    const releaseToAdd = { title: title, thumb: thumb };
    ltListCopy.push(releaseToAdd);
    setLTList(ltListCopy);
  }

  function fetchTracklist(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setDataForTracklist(data.tracklist))
      .catch((error) => console.log(error));
  }

  function toggleTracklistDisplay(url) {
    if (tracklistDisplayToggle) {
      setTracklistDisplayToggle(false);
    } else {
      setTracklistDisplayToggle(true);
      fetchTracklist(url);
    }
  }

  let displayTracklist;
  if (tracklistDisplayToggle) {
    displayTracklist = dataForTracklist.map((track, index) => (
      <li key={index}>{track.title}</li>
    ))
  }

  const displaySearchResults = dataFromSearch.map((result, index) => (
    <li key={index}>
      <img src={result.thumb} alt="thumbnail" />
      {result.title}
      <ul>
        <li>Label: {result.label[0]}</li>
        <li>Year: {result.year}</li>
        <li>Style: {result.style[0]}</li>
      </ul>
      {displayTracklist}
      <button onClick={() => toggleTracklistDisplay(result.resource_url)}>
        Display Tracklist
      </button>
      <button onClick={() => addToTLTList(result.title, result.thumb)}>
        Add to List
      </button>
    </li>
  ));

  const displayTLTList = tltList.map((release, index) => (
    <li key={index}>
      <img src={release.thumb} alt="thumbnail" />
      {release.title}
      <button onClick={() => addToLTList(release.title, release.thumb, index)}>
        Listened To
      </button>
    </li>
  ));

  const displayLTList = ltList.map((release, index) => (
    <li key={index}>
      <img src={release.thumb} alt="thumbnail" />
      {release.title}
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
      <Navbar />
      <Main
        searchQuery={searchQuery}
        displaySearchResults={displaySearchResults}
        displayList={displayList}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        setListDisplayToggle={setListDisplayToggle}
      />
    </div>
  );
}

export default App;
