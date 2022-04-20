import React, { useReducer } from "react";
import { apiInstance } from "../services/globals";
import faceitReducer from "../services/faceitReducer";
import steamReducer from "../services/steamReducer";

import FaceitLifetimeStats from "./FaceitLifetimeStats";
import SteamStats from "./SteamStats";
import FaceitMapsStats from "./FaceitMapsStats";
import GeneralProfile from "./GeneralProfile";
import ProfileCard from "./ProfileCard";

import steamDefault from "../services/steamDefault";
import faceitDefault from "../services/faceitDefault";

const PlayerProfile = ({ steamId }) => {
  const [steamProfile, setSteamProfile] = useReducer(
    steamReducer.communityProfileReducer,
    steamDefault.communityProfileDefault
  );
  const [recentlyPlayedGames, setRecentlyPlayedGames] = useReducer(
    steamReducer.recentlyPlayedGamesReducer,
    steamDefault.recentlyPlayedGamesDefault
  );
  const [achievements, setAchievements] = useReducer(
    steamReducer.playerAchievementsReducer,
    steamDefault.playerAchievementsDefault
  );
  const [steamStats, setSteamStats] = useReducer(
    steamReducer.userStatsForGameReducer,
    steamDefault.userStatsForGameDefault
  );
  const [playerBans, setPlayerBans] = useReducer(
    steamReducer.playerBansReducer,
    steamDefault.playerBansDefault
  );
  const [faceitProfile, setFaceitProfile] = useReducer(
    faceitReducer.faceitProfileReducer,
    faceitReducer.faceitProfileDefault
  );
  // const [faceitHistory, setFaceitHistory] = useReducer(faceitHistoryReducer);
  const [faceitStats, setFaceitStats] = useReducer(
    faceitReducer.faceitStatsReducer,
    faceitDefault.faceitStatsDefault
  );

  React.useEffect(() => {
    if (!steamId) return;

    apiInstance(`/steam/getplayersummaries/${steamId}`)
      .then(({ data }) => {
        setSteamProfile(data);
      })
      .catch(() => {});

    apiInstance(`/steam/getuserstatsforgame/${steamId}`)
      .then(({ data }) => setSteamStats(data))
      .catch(() => {});

    apiInstance(`/steam/getrecentlyplayedgames/${steamId}`)
      .then(({ data }) => setRecentlyPlayedGames(data))
      .catch(() => {});

    apiInstance(`/steam/getplayerachievements/${steamId}`)
      .then(({ data }) => setAchievements(data))
      .catch(() => {});

    apiInstance(`/steam/getplayerbans/${steamId}`)
      .then(({ data }) => setPlayerBans(data))
      .catch(() => {});

    apiInstance(`/faceit/players/${steamId}`)
      .then(({ data }) => {
        setFaceitProfile(data);
        apiInstance(`/faceit/stats/${data.player_id}`)
          .then(({ data }) => setFaceitStats(data))
          .catch(() => {});
      })
      .catch(() => {});
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
