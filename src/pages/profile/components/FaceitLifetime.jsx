import React from "react";
import FaceitLvlIcon from "../icons/FaceitLvlIcon";

const FaceitLifetime = ({ faceitStats, faceitProfile }) => {
  const stats = faceitStats.lifetime || {};

  const profileData = [
    { key: "ELO", value: faceitProfile.elo },
    { key: "K/D", value: stats["Average K/D Ratio"] },
    { key: "Matches", value: stats["Matches"] },
    {
      key: "Winrate",
      value: Math.round((stats["Wins"] / stats["Matches"]) * 100) + "%",
    },
    { key: "Headshots", value: stats["Average Headshots %"] + "%" },
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
          {stats["Recent Results"].map((v, i) => (
            <h4 className="pe-1" key={i}>
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
            <div className="d-flex" style={{ backgroundColor: "white" }}>
              <FaceitLvlIcon
                width={52}
                height={"84%"}
                className="d-flex-center"
                level={faceitProfile.level}
              />
            </div>
            {profileData.map(dataFormatting)}
            {stats["Recent Results"] && <LastGames />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceitLifetime;
