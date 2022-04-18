import React, { useReducer } from "react";
import { apiInstance } from "../services/globals";
import {
  // faceitHistoryReducer,
  faceitProfileReducer,
  faceitStatsReducer,
} from "../services/faceitReducer";
import {
  communityProfileReducer,
  playerAchievementsReducer,
  playerBansReducer,
  recentlyPlayedGamesReducer,
  userStatsForGameReducer,
} from "../services/steamReducers";

import FaceitLifetimeStats from "./FaceitLifetimeStats";
import SteamStats from "./SteamStats";
import FaceitMapsStats from "./FaceitMapsStats";
import GeneralProfile from "./GeneralProfile";
import ProfileCard from "./ProfileCard";
// import ProfileSpinner from "./ProfileSpinner";
// import FaceitCurrent from "./FaceitCurrent";

const PlayerProfile = ({ steamId }) => {
  const [steamProfile, setSteamProfile] = useReducer(communityProfileReducer);
  const [recentlyPlayedGames, setRecentlyPlayedGames] = useReducer(
    recentlyPlayedGamesReducer
  );
  const [achievements, setAchievements] = useReducer(playerAchievementsReducer);
  const [faceitProfile, setFaceitProfile] = useReducer(faceitProfileReducer);
  // const [faceitHistory, setFaceitHistory] = useReducer(faceitHistoryReducer);
  const [faceitStats, setFaceitStats] = useReducer(faceitStatsReducer);
  const [steamStats, setSteamStats] = useReducer(userStatsForGameReducer);
  const [playerBans, setPlayerBans] = useReducer(playerBansReducer);

  React.useEffect(() => {
    if (!steamId) return;

    apiInstance(`/api/v2/steam/getuserstatsforgame/${steamId}`)
      .then(({ data }) => setSteamStats(data))
      .catch(console.error);

    apiInstance(`/steam/getplayersummaries/${steamId}`)
      .then(({ data }) => setSteamProfile(data))
      .catch(console.error);

    apiInstance(`/steam/getrecentlyplayedgames/${steamId}`)
      .then(({ data }) => setRecentlyPlayedGames(data))
      .catch(console.error);

    apiInstance(`/steam/getplayerachievements/${steamId}`)
      .then(({ data }) => setAchievements(data))
      .catch(console.error);

    apiInstance(`/steam/getplayerbans/${steamId}`)
      .then(({ data }) => setPlayerBans(data))
      .catch(console.error);

    apiInstance(`/faceit/players/${steamId}`)
      .then(({ data }) => {
        setFaceitProfile(data);
        apiInstance(`/faceit/stats/${data.player_id}`)
          .then(({ data }) => setFaceitStats(data))
          .catch(console.error);
      })
      .catch(console.error);
  }, [steamId]);

  return (
    <div className="Profile container p-3">
      <div className="row gutters-sm">
        <div className="col-md-3 mb-3">
          <ProfileCard>
            <GeneralProfile
              steamProfile={steamProfile}
              faceitProfile={faceitProfile}
            />
          </ProfileCard>
        </div>
        <div className="col-md-9 mb-3">
          <ProfileCard>
            <SteamStats
              recentlyPlayedGames={recentlyPlayedGames}
              steamProfile={steamProfile}
              achievements={achievements}
              steamStats={steamStats}
              playerBans={playerBans}
            />
          </ProfileCard>
        </div>
      </div>
      <div className="row gutters-sm">
        <div className="col-sm-12 mb-3">
          <FaceitLifetimeStats
            faceitStats={faceitStats}
            faceitProfile={faceitProfile}
          />
        </div>
      </div>
      {/* <FaceitCurrent faceitHistory={faceitHistory} /> */}
      <div className="row gutters-sm">
        <div className="col-lg-8 offset-lg-2 mb-3">
          <FaceitMapsStats faceitStats={faceitStats} />
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
