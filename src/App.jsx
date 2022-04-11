import React from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/home/Home.jsx";
import Profile from "./pages/profile/Profile.jsx";

import "./app.css";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profiles/:id" element={<Profile />} />
        <Route path="/id/:id" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
