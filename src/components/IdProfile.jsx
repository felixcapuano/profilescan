import React, { useRef, useState } from "react";
import { ReactComponent as SteamLogo } from "../assets/icons/steamLogo.svg";
import { ReactComponent as FaceitLogo } from "../assets/icons/faceitLogo.svg";
import notFoundImg from "../assets/images/notFoundProfilePict.png";

const IdProfile = ({ steamProfile, faceitProfile }) => {
  const [pictLoaded, setPictLoaded] = useState(false);
  // const [pictError, setPictError] = useState(false);
  const pictError = useRef(false);

  const onPictLoaded = () => setPictLoaded(true);
  const onPictFailed = () => {
    pictError.current = true;
    setPictLoaded(true);
  };

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
      <div className="d-flex justify-content-center align-items-center h-50 w-100 rounded-circle">
        <img
          className="rounded-circle m-2"
          src={pictError.current ? notFoundImg : steamProfile.avatar}
          height="100%"
          onLoad={onPictLoaded}
          onError={onPictFailed}
          alt=""
        />
        {!pictLoaded && (
          <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="card text-dark">
      <div className="card-body h-100">
        <div className="d-flex flex-column align-items-center text-center h-100">
          <ProfileImg />
          <div className="mt-3">
            <h4 title="Steam username">{steamProfile.nickname}</h4>
            <p className="text-secondary mb-1" title="Faceit username">
              {faceitProfile.nickname}
            </p>
            <CircularButton link={faceitProfile.url} tooltips="Go to Faceit">
              <FaceitLogo />
            </CircularButton>
            <CircularButton link={steamProfile.url} tooltips="Go to Steam">
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
