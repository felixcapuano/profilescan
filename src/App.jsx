import { Route, Routes } from "react-router-dom";
import Profile from "./pages/profile/Profile.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Profile />} />
      <Route path="/profiles/:id" element={<Profile />} />
      <Route path="/id/:id" element={<Profile />} />
    </Routes>
  );
};

export default App;
