const steamReducer = {
  communityProfileReducer: (state, data) => {
    return {
      ...state,
      id: data.steamid,
      nickname: data.personaname,
      location: data.loccountrycode,
      avatar: data.avatarfull,
      url: data.profileurl,
      created: data.timecreated * 1000,
      isPrivate: Number(data.communityvisibilitystate) < 3 ? "private" : "public",
    };
  },
  playerBansReducer: (state, data) => {
    return {
      ...state,
      friendBanned: data.friendBanned,
      friendCount: data.friendCount,
      isVacBan: data.userVacBanned ? "yes" : "no",
    }
  },
  recentlyPlayedGamesReducer: (state, data) => ({
    ...state,
    minutesPlayed: data.playtime_forever,
    minutesPlayedLast2Weeks: data.playtime_2weeks,
  }),
  playerAchievementsReducer: (state, { achievements }) => {
    return {
      ...state,
      completed: achievements.filter((el) => el.achieved === 1).length,
      hacked: achievements.every(
        (el) => el.unlocktime === achievements[0].unlocktime
      ) ? "Hacked" : "Not Hacked",
      first: achievements.reduce((p, c) =>
        p.unlocktime < c.unlocktime && !c.achieved ? p : c
      ),
    };
  },
  friendsListReducer: (state, data) => ({
    ...state,
    count: data.friends.length,
  }),
  userStatsForGameReducer: (state, data) => {
    return {
      ...state,
      timePlayed: data.stats.find((s) => s.name === "total_time_played").value,
    };
  },
}

export default steamReducer;