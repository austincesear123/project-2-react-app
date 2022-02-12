import "./App.css";
import { Route, Link, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import discogsToken from "./discogsToken";
import Main from "./Main/Main";
import Navbar from "./Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
