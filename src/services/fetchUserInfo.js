const isHacked = (bool) => {
  return bool === 0 ? "false" : "true";
};

export const fetchUserInfos = (data, type, oldProfileInfo) => {
  const newInfos = oldProfileInfo;
  if (type === "steamPage") {
    ["steamID64", "vacBanned", "memberSince", "steamID", "location"].forEach(
      (el) =>
        data[el] ? newInfos.push({ [el]: Object.values(data[el])[0] }) : null
    );
  }
  if (type === "friendsList") {
    newInfos.push({ count: data.friends.length });
  }
  if (type === "playerAchievements") {
    newInfos.push({
      achievementCompleted: data.achievements.filter((el) => el.achieved === 1)
        .length,
    });
    newInfos.push({
      achievementHacked: isHacked(
        data.achievements.every((el) => el === data.achievements[0].unlocktime)
      ),
    });
  }
  if (type === "recentlyPlayedGames") {
    if (data.total_count > 0) {
      // appid c'est quoi ?
      newInfos.push({ minutesPlayed: data.games[0].playtime_forever });
      newInfos.push({ minutesPlayedLast2Weeks: data.games[0].playtime_2weeks });
      newInfos.push({ minutesPlayedOnWindows: data.games[0].playtime_2weeks });
    }
  }

  if (type === "faceitProfile") {
    if (data.games.csgo) {
      newInfos.push({ faceitElo: data.games.csgo.faceit_elo });
      newInfos.push({ faceitLevel: data.games.csgo.skill_level });
      newInfos.push({ faceitNickname: data.nickname });
    }
  }
  console.log(data);
  return [...new Set(newInfos)];
};
