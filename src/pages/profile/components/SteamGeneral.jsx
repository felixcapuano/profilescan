import React from "react";
import moment from "moment";
import { minutes_to_hours } from "../../../services/utils";

const SteamGeneral = ({
  steamFriends = {},
  recentlyPlayedGames = {},
  steamProfile = {},
  achievements = {},
}) => {
  const timePlay = minutes_to_hours(recentlyPlayedGames.minutesPlayed);
  const timePlayL2W = minutes_to_hours(recentlyPlayedGames.minutesPlayed);

  const data = [
    { key: "Account status", value: "public" },
    {
      key: "Created",
      value: moment(steamProfile.memberSince, "LL").fromNow(),
    },
    {
      key: "Start playing CSGO",
      value: moment(
        achievements.firstAchieved?.unlocktime * 1000 || 0
      ).fromNow(),
    },
    { key: "Friends", value: `${steamFriends.count}` },
    {
      key: "Time played",
      value: `${timePlay} hours (${timePlayL2W}h last 2 weeks)`,
    },
    {
      key: "Achievements",
      value: `${achievements.hacked ? "Hacked" : "Not Hacked"} (${
        achievements.completed
      }/167)`,
    },
  ];

  const renderMainInfo = ({ key = "", value = "" }) => {
    return (
      <div key={`${key}${value}`}>
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">{key}</h6>
          </div>
          <div className="col-sm-9 text-secondary">{value}</div>
        </div>
        <hr />
      </div>
    );
  };

  return (
    <div className="col-md-9">
      <div className="card mb-3">
        <div className="card-body">{data.map(renderMainInfo)}</div>
      </div>
    </div>
  );
};

export default SteamGeneral;
