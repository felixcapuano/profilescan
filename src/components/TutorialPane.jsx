import React from "react";
import tutorialGif from "../assets/gifs/tutorial.gif";

const TutorialPane = () => {
  return (
    <a className="text-decoration-none text-reset w-50" href={tutorialGif}>
      <div className="card bg-info p-1 m-2">
        <div className="card-body">
          <h5 className="card-title">Trick</h5>
          <p className="card-text">
            Type "scan" before the url of the steam community profile to be
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
// <div className="alert alert-info p-2 m-0" role="alert">
//   <div className="text-left p-2 fs-5">
//     <span className="fw-bold">Trick : </span>
//     Type "scan" before the url of the steam community profile to be
//     redirected toward Profilescan.
//   </div>
//   <a href={tutorialGif}>
//     <img
//       className="rounded img-fluid"
//       src={tutorialGif}
//       alt="loading..."
//       width="100%"
//     />
//   </a>
// </div>

export default TutorialPane;
