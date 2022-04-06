export const faceitProfileReducer = (state, data) => {
  return data.games.csgo
    ? {
      elo: data.games.csgo.faceit_elo,
      level: data.games.csgo.skill_level,
      nickname: data.nickname,
      url: data.faceit_url.replace("{lang}", "en"),
      id: data.player_id,
    }
    : state;
};
