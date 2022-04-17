import moment from "moment";

export const communityProfileReducer = (state, data) => {
  return {
    id: data.steamid,
    nickname: data.personaname,
    location: data.loccountrycode,
    avatar: data.avatarfull,
    url: data.profileurl,
    created: data.timecreated * 1000,
    isPrivate: Number(data.communityvisibilitystate) < 3 ? "private" : "public",
  };
};

export const playerBansReducer = (state, data) => {
  return {
    ...data,
    isVacBan: data.userVacBanned ? "yes" : "no",
  }
};

export const recentlyPlayedGamesReducer = (state, data) => ({
  minutesPlayed: data.playtime_forever,
  minutesPlayedLast2Weeks: data.playtime_2weeks,
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
    timePlayed: data.stats.find((s) => s.name === "total_time_played").value,
  };
};
