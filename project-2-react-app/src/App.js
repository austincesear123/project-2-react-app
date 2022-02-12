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
          return `https://api.discogs.com/database/search?artist=${obj.artist}&release_title=${obj.album}&genre=${obj.genre}&token=${discogsToken}`;
        }
      } else {
        return `https://api.discogs.com/database/search?artist=${obj.artist}&release_title=${obj.album}&token=${discogsToken}`;
      }
      return `https://api.discogs.com/database/search?artist=${obj.artist}&token=${discogsToken}`;
    } else if (obj.album !== "") {
      if (obj.genre !== "") {
        return `https://api.discogs.com/database/search?release_title=${obj.album}&genre=${obj.genre}&token=${discogsToken}`;
      }
      return `https://api.discogs.com/database/search?release_title=${obj.album}&token=${discogsToken}`;
    } else if (obj.genre !== "") {
      return `https://api.discogs.com/database/search?style=${obj.genre}&token=${discogsToken}`;
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

  const displaySearchResults = dataFromSearch.map((result, index) => (
    <li key={index}>
      <img src={result.thumb} alt="thumbnail" />
      {result.title}
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
