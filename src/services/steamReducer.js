import defaults from "./steamDefault";

const steamReducer = {
  communityProfile: (state, data) => {
    return {
      ...state,
      id: data.steamid,
      nickname: data.personaname,
      location: data.loccountrycode,
      avatar: data.avatarfull,
      url: data.profileurl,
      created: data.timecreated,
      isPrivate:
        Number(data.communityvisibilitystate) < 3 ? "private" : "public",
    };
  },
  playerBans: (state, data) => {
    return {
      ...state,
      friendCount: data.friendCount || defaults.playerBans.friendCount,
      friendBanned: data.friendBanned || defaults.playerBans.friendBanned,
      isVacBan: data.userVacBanned ? "yes" : "no",
    };
  },
  recentlyPlayedGames: (state, data) => {
    return {
      ...state,
      minutesPlayed: data.playtime_forever,
      minutesPlayedLast2Weeks: data.playtime_2weeks,
    };
  },
  playerAchievements: (state, { achievements }) => {
    const first = achievements.reduce((p, c) =>
      p.unlocktime < c.unlocktime && !c.achieved ? p : c
    );

    const hacked = achievements.every(
      (el) => el.unlocktime === achievements[0].unlocktime
    )
      ? "Hacked"
      : "Not Hacked";

    const completed = achievements.filter((el) => el.achieved === 1).length;

    return { ...state, completed, hacked, first };
  },
  friendsList: (state, data) => ({
    ...state,
    count: data.friends.length,
  }),
  userStatsForGame: (state, data) => {
    return {
      ...state,
      timePlayed: data.stats.find((s) => s.name === "total_time_played").value,
    };
  },
};

export default steamReducer;
