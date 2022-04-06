import React from "react";
import FaceitLvlIcon from "../icons/FaceitLvlIcon";

const FaceitLifetime = ({ faceitStats, faceitProfile }) => {
  const stats = faceitStats.lifetime || {};

  const profileData = [
    { key: "ELO", value: faceitProfile.elo },
    { key: "K/D", value: stats["Average K/D Ratio"] },
    { key: "Matches", value: stats["Matches"] },
    { key: "Wins", value: stats["Wins"] },
    { key: "Headshots", value: `${stats["Average Headshots %"]}%` },
  ];

  const dataFormatting = ({ key, value }) => {
    return (
      <Item value={key} key={key}>
        <h4 className="fw-bold text-start">{value}</h4>
      </Item>
    );
  };

  const Item = ({ children, value }) => {
    return (
      <div className="ms-4 me-4">
        <h6 className="fw-light text-start">{value}</h6>
        {children}
      </div>
    );
  };

  const LastGames = () => {
    return (
      <Item value="Last games">
        <div className="d-flex">
          {stats["Recent Results"].map((v) => (
            <h4 className="pe-1">
              {Number(v) ? (
                <span className="badge bg-success">W</span>
              ) : (
                <span className="badge bg-danger">L</span>
              )}
            </h4>
          ))}
        </div>
      </Item>
    );
  };

  return (
    <div className="row gutters-sm">
      <div className="col-sm-12 mb-3">
        <div className="card h-100">
          <div className="d-flex justify-content-center card-body">
            <FaceitLvlIcon
              width={52}
              height={52}
              className="d-flex-center"
              level={faceitProfile.level}
            />
            {profileData.map(dataFormatting)}
            <LastGames />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceitLifetime;
