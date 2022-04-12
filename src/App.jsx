import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/home/Home.jsx";
import Profile from "./pages/profile/Profile.jsx";

import "./app.css";
import { ThemeContext } from "./contexts";

const App = () => {
  const [theme, setTheme] = useState("light");

  return (
    <div className={"theme-" + theme}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profiles/:id" element={<Profile />} />
          <Route path="/id/:id" element={<Profile />} />
        </Routes>
      </ThemeContext.Provider>
    </div>
  );
};

export default App;
