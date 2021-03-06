import React from "react";
import FaceitLvlIcon from "./FaceitLvlIcon";

const FaceitLifetimeStats = ({ faceitStats = {}, faceitProfile = {} }) => {
  if (faceitProfile.elo < 1) return null;
  const stats = faceitStats.lifetime;

  const profileData = [
    { key: "ELO", value: faceitProfile.elo },
    { key: "K/D", value: stats["Average K/D Ratio"] },
    { key: "Matches", value: stats["Matches"] },
    {
      key: "Winrate",
      value: Math.round((stats["Wins"] / stats["Matches"]) * 100) || 0 + "%",
    },
    {
      key: "Headshots",
      value: stats["Average Headshots %"] + "%",
    },
  ];

  const dataFormatting = ({ key, value, hidden }) => {
    return (
      <div hidden={hidden} key={key}>
        <Item value={key}>
          <h4 className="d-flex fw-bold text-start">{value}</h4>
        </Item>
      </div>
    );
  };

  const Item = ({ children, value, hidden }) => {
    return (
      <div className={`d-flex flex-column ms-4 me-4`}>
        <h6 className=" fw-light text-start">{value}</h6>
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
    <div className="card h-100 text-dark">
      <div className="d-lg-flex justify-content-center card-body">
        <div className="d-flex justify-content-center">
          <FaceitLvlIcon
            width={52}
            height={"84%"}
            level={faceitProfile.level}
          />
        </div>
        <div className="d-sm-flex justify-content-center">
          {profileData.map(dataFormatting)}
        </div>
        <div className="d-flex justify-content-center">
          {stats["Recent Results"] && <LastGames />}
        </div>
      </div>
    </div>
  );
};

export default FaceitLifetimeStats;
