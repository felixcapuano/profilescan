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
import FaceitLifetime from "./FaceitLifetime";
import SteamGeneral from "./SteamGeneral";
// import FaceitCurrent from "./FaceitCurrent";
import FaceitMaps from "./FaceitMaps";
import IdProfile from "./IdProfile";

const PlayerProfile = ({ steamId }) => {
  const [steamProfile, setSteamProfile] = useReducer(
    communityProfileReducer,
    {}
  );
  const [recentlyPlayedGames, setRecentlyPlayedGames] = useReducer(
    recentlyPlayedGamesReducer,
    {}
  );
  const [achievements, setAchievements] = useReducer(
    playerAchievementsReducer,
    {}
  );
  const [faceitProfile, setFaceitProfile] = useReducer(
    faceitProfileReducer,
    {}
  );
  // const [faceitHistory, setFaceitHistory] = useReducer(
  //   faceitHistoryReducer,
  //   {}
  // );
  const [faceitStats, setFaceitStats] = useReducer(faceitStatsReducer, {});
  const [steamStats, setSteamStats] = useReducer(userStatsForGameReducer, {});
  const [playerBans, setPlayerBans] = useReducer(playerBansReducer, {});

  React.useEffect(() => {
    // STEAM
    const getSteamProfile = async () => {
      try {
        const { data } = await apiInstance(
          `/api/v2/steam/getplayersummaries/${steamId}`
        );
        setSteamProfile(data);
      } catch (e) {}
    };
    const getAchievements = async () => {
      try {
        const { data } = await apiInstance(
          `/api/v2/steam/getplayerachievements/${steamId}`
        );
        setAchievements(data);
      } catch (e) {}
    };
    const getRecentlyPlayedGames = async () => {
      try {
        const { data } = await apiInstance(
          `/api/v2/steam/getrecentlyplayedgames/${steamId}`
        );
        setRecentlyPlayedGames(data);
      } catch (e) {}
    };
    const getSteamStats = async () => {
      try {
        const { data } = await apiInstance(
          `/api/v2/steam/getuserstatsforgame/${steamId}`
        );
        setSteamStats(data);
      } catch (e) {}
    };
    const getPlayerBans = async () => {
      try {
        const { data } = await apiInstance(
          `/api/v2/steam/getplayerbans/${steamId}`
        );
        setPlayerBans(data);
      } catch (e) {}
    };
    // FACEIT
    const getFaceitProfile = () => {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await apiInstance(
            `/api/v2/faceit/players/${steamId}`
          );
          setFaceitProfile(data);
          resolve(data.player_id);
        } catch (e) {
          reject();
        }
      });
    };
    const getFaceitStats = async (faceitId) => {
      try {
        const { data } = await apiInstance(`/api/v2/faceit/stats/${faceitId}`);
        setFaceitStats(data);
      } catch (e) {}
    };
    // const getFaceitHistory = async (faceitId) => {
    //   try {
    //     const { data } = await apiInstance(
    //       `/api/v2/faceit/history/${faceitId}`
    //     );
    //     setFaceitHistory(data);
    //   } catch (e) {}
    // };

    if (!steamId) return;

    getSteamProfile();
    getRecentlyPlayedGames();
    getAchievements();
    getSteamStats();
    getPlayerBans();

    getFaceitProfile()
      .then((faceitId) => {
        getFaceitStats(faceitId);
        // getFaceitHistory(faceitId);
      })
      .catch((e) => console.warn("No faceit profile found!"));
  }, [steamId]);

  return (
    <div className="Profile container p-3">
      <div className="row gutters-sm">
        <div className="col-md-3 mb-3">
          <IdProfile
            steamProfile={steamProfile}
            faceitProfile={faceitProfile}
          />
        </div>
        <div className="col-md-9 mb-3">
          <SteamGeneral
            recentlyPlayedGames={recentlyPlayedGames}
            steamProfile={steamProfile}
            achievements={achievements}
            steamStats={steamStats}
            playerBans={playerBans}
          />
        </div>
      </div>
      <div className="row gutters-sm">
        <div className="col-sm-12 mb-3">
          <FaceitLifetime
            faceitStats={faceitStats}
            faceitProfile={faceitProfile}
          />
        </div>
      </div>
      {/* <FaceitCurrent faceitHistory={faceitHistory} /> */}
      <div className="row gutters-sm">
        <div className="col-lg-8 offset-lg-2 mb-3">
          <FaceitMaps faceitStats={faceitStats} />
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
