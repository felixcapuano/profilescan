import React from "react";
import moment from "moment";
import { minutes_to_hours, seconds_to_hours } from "../services/utils";

const SteamStats = ({
  playerBans,
  recentlyPlayedGames,
  steamProfile,
  achievements,
  steamStats,
}) => {
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
      value: moment.unix(steamProfile.created).fromNow(),
    },
    {
      key: "Start playing CSGO",
      value: moment.unix(achievements.first.unlocktime).fromNow(),
      hidden: achievements.first.unlocktime === -1,
    },
    {
      key: "Friends",
      value: `${playerBans.friendCount} (${playerBans.friendBanned} banned)`,
      hidden: playerBans.friendCount < 0,
    },
    {
      key: "Time played",
      value: `${timePlay} hours (${timePlayL2W}h last 2 weeks)`,
      hidden: timePlay < 0,
    },
    {
      key: "Achievements",
      value: `${achievements.hacked} (${achievements.completed}/167)`,
      hidden: achievements.hacked === "undefined",
    },
  ];

  const renderMainInfo = ({ key = "", value = "", hidden }) => {
    return (
      <tr key={`${key}${value}`} hidden={hidden}>
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
