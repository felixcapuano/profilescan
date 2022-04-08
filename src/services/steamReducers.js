export const communityProfileReducer = (state, data) => ({
  id: data.steamID64,
  vacBanned: Number(data.vacBanned),
  memberSince: data.memberSince,
  nickname: data.steamID,
  location: data.location,
  avatar: data.avatarFull,
  url: data.steamLink,
  isPublic: Number(data.visibilityState) > 2,
});

export const recentlyPlayedGamesReducer = (state, { games }) => ({
  minutesPlayed: games[0].playtime_forever,
  minutesPlayedLast2Weeks: games[0].playtime_2weeks,
});

export const playerAchievementsReducer = (state, { achievements }) => {
  return {
    completed: achievements.filter((el) => el.achieved === 1).length,
    hacked: achievements.every((el) => el === achievements[0].unlocktime),
    firstAchieved: achievements.reduce((p, c) =>
      p.unlocktime < c.unlocktime && !c.achieved ? p : c
    ),
  };
};

export const friendsListReducer = (state, data) => ({
  count: data.friends.length,
});

export const userStatsForGameReducer = (state, data) => {
  return {
    timePlayed: data.stats.filter((s) => s.name === "total_time_played")[0]
      .value,
  };
};
