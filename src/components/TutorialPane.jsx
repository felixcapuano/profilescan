import React from "react";
import tutorialGif from "../assets/gifs/tutorial.gif";

const TutorialPane = () => {
  return (
    <a className="text-decoration-none text-reset w-50" href={tutorialGif}>
      <div className="card bg-light p-1 m-2 shadow text-dark">
        <div className="card-body">
          <h5 className="card-title">Trick</h5>
          <p className="card-text">
            Type "scan" before the url of the steam community profile to be
            redirected toward Profilescan.
          </p>
        </div>
        <img
          className="rounded img-fluid"
          src={tutorialGif}
          alt="loading..."
          width="100%"
        />
      </div>
    </a>
  );
};

export default TutorialPane;
