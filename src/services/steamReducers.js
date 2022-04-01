export const communityProfileReducer = (
  state,
  { steamID64, vacBanned, memberSince, steamID, location }
) => ({
  steamID64,
  vacBanned,
  memberSince,
  steamID,
  location,
});

export const recentlyPlayedGamesReducer = (state, { games }) => ({
  minutesPlayed: games[0].playtime_forever,
  minutesPlayedLast2Weeks: games[0].playtime_2weeks,
  minutesPlayedOnWindows: games[0].playtime_2weeks,
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
  friendsCount: data.friends.length,
});
