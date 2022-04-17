import React from "react";

const ProfileCard = ({ children }) => {
  return (
    <div className="card text-dark">
      <div className="card-body h-100">{children}</div>
    </div>
  );
};

export default ProfileCard;
