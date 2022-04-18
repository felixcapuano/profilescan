import React from "react";
import ProfileCard from "./ProfileCard";
import { ReactComponent as SteamLogo } from "../assets/icons/steamLogo.svg";
import { ReactComponent as FaceitLogo } from "../assets/icons/faceitLogo.svg";
// import notFoundImg from "../assets/images/notFoundProfilePict.png";

const IdProfileCard = ({ steamProfile, faceitProfile }) => {
  const CircularButton = ({ children, link, tooltips }) => {
    return (
      <a href={link}>
        <button
          type="button"
          className="btn btn-outline-dark btn-circle btn-sm"
          key={children.type.name}
          title={tooltips}
        >
          {children}
        </button>
      </a>
    );
  };

  const ProfileImg = () => {
    return (
      // <div className="d-flex justify-content-center align-items-center h-50 w-100 rounded-circle bg-dark">
      <div className="d-flex justify-content-center align-items-center">
        <img
          className="rounded-circle"
          src={steamProfile.avatar}
          // height="100%"
          width="100%"
          alt=""
        />
      </div>
    );
  };

  return (
    <ProfileCard>
      <div className="d-flex flex-column align-items-center">
        <div className="">
          <ProfileImg />
        </div>
        <div className="text-center mt-2">
          <h4 title="Steam username">
            {steamProfile.nickname || "steam username"}
          </h4>
          <p className="text-secondary mb-1" title="Faceit username">
            {faceitProfile.nickname || "faceit username"}
          </p>
        </div>
        <div className="">
          <div className="d-flex justify-content-center">
            <CircularButton link={faceitProfile.url} tooltips="Go to Faceit">
              <FaceitLogo />
            </CircularButton>
            <CircularButton link={steamProfile.url} tooltips="Go to Steam">
              <SteamLogo />
            </CircularButton>
          </div>
        </div>
        <div className="">
          <a
            href={`https://faceitfinder.com/profile/${steamProfile.id}`}
            className="d-flex text-decoration-none"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn btn-dark">Go to Faceitfinder</button>
          </a>
        </div>
      </div>
    </ProfileCard>
  );
};

export default IdProfileCard;
