import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Profile from "./pages/profile/Profile.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profiles/:id" element={<Profile />} />
      <Route path="/id/:id" element={<Profile />} />
    </Routes>
  );
};

export default App;
