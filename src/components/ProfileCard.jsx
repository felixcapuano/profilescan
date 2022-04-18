import React, { useState } from "react";
import { CardContext } from "../contexts";

const ProfileCard = ({ children }) => {
  const [loaded, setLoaded] = useState(false);

  const Spinner = () => {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  };
  return (
    <div className="card text-dark">
      <div className="card-body h-100">
        <div hidden={!loaded}>
          <CardContext.Provider value={{ loaded, setLoaded }}>
            {children}
          </CardContext.Provider>
        </div>
        {!loaded && <Spinner />}
      </div>
    </div>
  );
};

export default ProfileCard;
