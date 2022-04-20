const faceitReducer = {
  faceitProfile: (state, data) => {
    if (!data.games.csgo) return state;
    return {
      ...state,
      elo: data.games.csgo.faceit_elo,
      level: data.games.csgo.skill_level,
      nickname: data.nickname,
      url: data.faceit_url.replace("{lang}", "en"),
      id: data.player_id,
    }
  },
  faceitHistory: (state, data) => {
    return {
      ...state,
      matches: data.items,
    };
  },
  faceitStats: (state, data) => {
    return {
      ...state,
      maps: data.segments,
      lifetime: data.lifetime,
    };
  },
}



export default faceitReducer;