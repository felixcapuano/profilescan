export const communityProfileReducer = (state, data) => ({
  // vacBanned: Number(data.vacBanned),
  created: data.timecreated,
  nickname: data.personaname,
  location: data.loccountrycode,
  avatar: data.avatarfull,
  url: data.profileurl,
  isPrivate: Number(data.communityvisibilitystate) < 3,
});

export const playerBansReducer = (state, data) => {
  return data;
};

export const recentlyPlayedGamesReducer = (state, { games }) => ({
  minutesPlayed: games[0].playtime_forever,
  minutesPlayedLast2Weeks: games[0].playtime_2weeks,
});

export const playerAchievementsReducer = (state, { achievements }) => {
  return {
    completed: achievements.filter((el) => el.achieved === 1).length,
    hacked: achievements.every(
      (el) => el.unlocktime === achievements[0].unlocktime
    ),
    first: achievements.reduce((p, c) =>
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
