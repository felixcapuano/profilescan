import React from "react";
import tutorialGif from "../assets/gifs/tutorial.gif";

const TutorialPane = () => {
  return (
    <div className="alert alert-info p-1 m-0" role="alert">
      <div className="text-left p-2 fs-5">
        <span className="fw-bold">Trick : </span>
        Type "scan" before the url of the steam community profile to be
        redirected toward Profilescan.
      </div>
      <a href={tutorialGif}>
        <img
          className="rounded"
          src={tutorialGif}
          alt="loading..."
          width="100%"
        />
      </a>
    </div>
  );
};

export default TutorialPane;
