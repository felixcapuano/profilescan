export const communityProfileReducer = (state, data) => {
  return {
    id: data.steamID64,
    vacBanned: Number(data.vacBanned),
    memberSince: data.memberSince,
    nickname: data.steamID,
    location: data.location,
    avatar: data.avatarFull,
    url: data.steamLink,
  };
};

export const recentlyPlayedGamesReducer = (state, { games }) => ({
  minutesPlayed: games[0].playtime_forever,
  minutesPlayedLast2Weeks: games[0].playtime_2weeks,
});

export const playerAchievementsReducer = (state, { achievements }) => {
  return {
    achievementCompleted: achievements.filter((el) => el.achieved === 1).length,
    achievementHacked: achievements.every(
      (el) => el === achievements[0].unlocktime
    ),
  };
};

export const friendsListReducer = (state, data) => ({
  count: data.friends.length,
});
