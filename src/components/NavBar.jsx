import React from "react";
import { ReactComponent as QuestionIcon } from "../assets/icons/question.svg";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Steam Scanner
        </a>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </li>
        </ul>
        <button className="btn btn-outline-light">
          <QuestionIcon color="white" width={30} height={30} />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
