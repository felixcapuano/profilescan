import React from "react";
import { ReactComponent as SteamLogo } from "../assets/icons/steamLogo.svg";
import { ReactComponent as FaceitLogo } from "../assets/icons/faceitLogo.svg";

const IdProfile = ({ steamProfile, faceitProfile }) => {
  const CircularButton = ({ children, link }) => {
    return (
      <a href={link}>
        <button
          type="button"
          className="btn btn-outline-dark btn-circle btn-sm"
          key={children.type.name}
        >
          {children}
        </button>
      </a>
    );
  };
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex flex-column align-items-center text-center">
          <img
            src={steamProfile.avatar}
            alt="Avatar"
            className="rounded-circle"
            width="150"
          />
          <div className="mt-3">
            <h4>{steamProfile.nickname}</h4>
            <p className="text-secondary mb-1">{faceitProfile.nickname}</p>
            <CircularButton link={faceitProfile.url}>
              <FaceitLogo />
            </CircularButton>
            <CircularButton link={steamProfile.url}>
              <SteamLogo />
            </CircularButton>
            <a
              href={`https://faceitfinder.com/profile/${steamProfile.id}`}
              className="d-flex"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn btn-dark">Go to Faceitfinder</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdProfile;
