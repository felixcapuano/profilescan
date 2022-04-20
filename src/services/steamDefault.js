const steamDefault = {
  communityProfile: {
    id: "undefined",
    nickname: "username",
    location: "unknown",
    avatar: "undefined",
    url: "https://steamcommunity.com",
    created: -1,
    isPrivate: "undefined",
  },
  playerBans: {
    friendBanned: -1,
    friendCount: -1,
    isVacBan: "undefined",
  },
  recentlyPlayedGames: {
    minutesPlayed: 0,
    minutesPlayedLast2Weeks: 0,
  },
  playerAchievements: {
    completed: -1,
    hacked: "undefined",
    first: {
      achieved: -1,
      apiname: "UNDEFINED",
      unlocktime: -1,
    },
  },
  friendsList: {
    count: -1,
  },
  userStatsForGame: {
    timePlayed: -1,
  },
};

export default steamDefault;