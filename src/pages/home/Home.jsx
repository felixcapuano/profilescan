import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isValidSteamId } from "../../services/utils";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!isValidSteamId(searchValue)) return;
    navigate("/profiles/" + searchValue);
  };

  return (
    <div className="home">
      <div className="search d-flex align-items-center justify-content-center">
        <div className="d-column-flex text-center">
          <h1>Steam Scanner</h1>
          <h3 className="pb-3">
            Quickly find general informations about sus player
          </h3>
          <form onSubmit={handleSearch}>
            <div className="input-group">
              <div className="form-floating search-input-group">
                <input
                  type="text"
                  id="search-input"
                  className="form-control"
                  placeholder="Steam ID"
                  aria-describedby="search-input-group"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  required
                />
                <label htmlFor="search-input">Steam ID</label>
              </div>
              <button
                type="submit"
                className="btn btn-secondary search-button"
                id="search-input"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="alert alert-warning" role="alert">
          Tip you can simply typing scan before the url of the steam community
          profile.
        </div>
      </div>
    </div>
  );
};

export default Home;
