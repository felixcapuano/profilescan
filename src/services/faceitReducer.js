export const faceitProfileReducer = (state, { games, nickname }) => {
  return games.csgo
    ? {
      faceitElo: games.csgo.faceit_elo,
      faceitLevel: games.csgo.skill_level,
      faceitNickname: nickname,
    }
    : state;
};
