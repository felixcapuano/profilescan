import { Route, Routes } from "react-router-dom";
import Profile from "./Pages/Profile";

const App = () => {
  console.log(process.env.NODE_ENV);
  return (
    <div className="App">
      Senpai
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/profiles/:id" element={<Profile />} />
        <Route path="/id/:id" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
