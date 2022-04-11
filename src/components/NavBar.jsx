import React, { useState } from "react";
import { ReactComponent as QuestionIcon } from "../assets/icons/question.svg";
import { ReactComponent as ContrastIcon } from "../assets/icons/contrast.svg";
import { useNavigate } from "react-router-dom";
import { isValidSteamId } from "../services/utils";
import HelpModal from "./HelpModal";

const NavBar = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [toggleHelpModal, setToggleHelpModal] = useState(false);

  const helpHandler = () => {
    setToggleHelpModal(true);
  };
  const contrastHandler = () => {
    console.log("contrast");
  };
  const searchHandler = (e) => {
    e.preventDefault();
    if (!isValidSteamId(searchValue)) return;
    navigate("/profiles/" + searchValue);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Steam Scanner Alpha
        </a>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <form className="d-flex" onSubmit={searchHandler}>
              <input
                className="form-control bg-dark text-white"
                type="search"
                placeholder="Steam ID"
                aria-label="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </form>
          </li>
        </ul>
        <QuestionIcon
          className="item-icon"
          onClick={helpHandler}
          width={30}
          height={30}
        />
        <ContrastIcon
          className="item-icon ms-2"
          onClick={contrastHandler}
          width={30}
          height={30}
          hidden
        />
        <HelpModal toggle={toggleHelpModal} setToggle={setToggleHelpModal} />
      </div>
    </nav>
  );
};

export default NavBar;
