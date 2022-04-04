export const faceitProfileReducer = (
  state,
  { games, nickname, faceit_url }
) => {
  return games.csgo
    ? {
      elo: games.csgo.faceit_elo,
      level: games.csgo.skill_level,
      nickname,
      url: faceit_url.replace("{lang}", "en"),
    }
    : state;
};
