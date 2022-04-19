import React from "react";
import moment from "moment";
import { minutes_to_hours, seconds_to_hours } from "../services/utils";

const SteamStats = ({
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
      value: `${achievements.hacked} (${achievements.completed}/167)`,
    },
  ];

  const renderMainInfo = ({ key = "", value = "", hidden }) => {
    return (
      <tr key={`${key}${value}`}>
        <td>{key}</td>
        <td>{value}</td>
      </tr>
    );
  };

  return (
    <table className="table">
      <tbody>{data.map(renderMainInfo)}</tbody>
    </table>
  );
};

export default SteamStats;
