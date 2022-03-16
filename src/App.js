import { Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import Home from "./Home";

const App = () => {
  console.log(process.env.NODE_ENV);
  return (
    <div className="App">
      <h1>Steam community profile scanner</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profiles/:id" element={<Profile />} />
        <Route path="/id/:id" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
