import React from "react";
import moment from "moment";
import { minutes_to_hours, seconds_to_hours } from "../services/utils";

const SteamGeneral = ({
  playerBans = {},
  recentlyPlayedGames = {},
  steamProfile = {},
  achievements = {},
  steamStats = {},
}) => {
  if (
    !playerBans ||
    !recentlyPlayedGames ||
    !steamProfile ||
    !achievements ||
    !steamStats
  )
    return null;

  const timePlay = seconds_to_hours(steamStats.timePlayed);
  const timePlayL2W = minutes_to_hours(
    recentlyPlayedGames.minutesPlayedLast2Weeks
  );

  console.log(steamProfile);
  const data = [
    {
      key: "Account status",
      value: steamProfile.isPrivate,
    },
    {
      key: "VAC Ban",
      value: playerBans.isVacBan,
    },
    {
      key: "Created",
      value: moment(steamProfile.created).fromNow(),
    },
    // {
    //   key: "Start playing CSGO",
    //   value: achievements.first?.unlocktime
    //     ? moment(achievements.first?.unlocktime * 1000).fromNow()
    //     : "",
    //   value: 0,
    // },
    {
      key: "Friends",
      value: `${playerBans.friendCount} (${playerBans.friendBanned} banned)`,
    },
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

  const renderMainInfo = ({ key = "", value = "", hidden }) => {
    return (
      <tr key={`${key}${value}`}>
        {/* <div className="row pb-3">
          <div className="col-sm-3">
            <h6 className="mb-0">{key}</h6>
          </div>
          <div className="col-sm-9 text-secondary">{value}</div>
        </div> */}
        <td>{key}</td>
        <td>{value}</td>
      </tr>
    );
  };

  return (
    <div className="card">
      <div className="card-body">
        <table className="table">
          <tbody>{data.map(renderMainInfo)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default SteamGeneral;
