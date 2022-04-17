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
  const timePlay = seconds_to_hours(steamStats.timePlayed);
  const timePlayL2W = minutes_to_hours(
    recentlyPlayedGames.minutesPlayedLast2Weeks
  );

  const data = [
    {
      key: "Account status",
      value: steamProfile.isPrivate ? "Private" : "Public",
      hidden: false,
    },
    {
      key: "VAC Ban",
      value: playerBans.userVacBanned ? "Yes" : "No",
      hidden: steamProfile.isPrivate,
    },
    {
      key: "Created",
      value: steamProfile ? moment(steamProfile.created * 1000).fromNow() : "",
      hidden: steamProfile.isPrivate,
    },
    {
      key: "Start playing CSGO",
      // value: achievements.first?.unlocktime
      //   ? moment(achievements.first?.unlocktime * 1000).fromNow()
      //   : "",
      value: 0,
      hidden: steamProfile.isPrivate,
    },
    {
      key: "Friends",
      value: `${playerBans.friendCount} (${playerBans.friendBanned} banned)`,
      hidden: steamProfile.isPrivate,
    },
    {
      key: "Time played",
      value: `${timePlay} hours (${timePlayL2W}h last 2 weeks)`,
      hidden: steamProfile.isPrivate,
    },
    {
      key: "Achievements",
      value: `${achievements.hacked ? "Hacked" : "Not Hacked"} (${
        achievements.completed
      }/167)`,
      hidden: steamProfile.isPrivate,
    },
  ];

  const renderMainInfo = ({ key = "", value = "", hidden }) => {
    return (
      <tr key={`${key}${value}`} hidden={hidden}>
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
