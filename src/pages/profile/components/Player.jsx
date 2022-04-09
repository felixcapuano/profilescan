import React, { useReducer } from "react";
import { apiInstance } from "../../../services/globals";
import SteamLogo from "../icons/SteamLogo";
import FaceitLogo from "../icons/FaceitLogo";
import {
  faceitHistoryReducer,
  faceitProfileReducer,
  faceitStatsReducer,
} from "../../../services/faceitReducer";
import {
  communityProfileReducer,
  friendsListReducer,
  playerAchievementsReducer,
  recentlyPlayedGamesReducer,
  userStatsForGameReducer,
} from "../../../services/steamReducers";
import FaceitLifetime from "./FaceitLifetime";
import SteamGeneral from "./SteamGeneral";
import FaceitCurrent from "./FaceitCurrent";
import FaceitMaps from "./FaceitMaps";

const Player = ({ steamId }) => {
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
  const [faceitHistory, setFaceitHistory] = useReducer(
    faceitHistoryReducer,
    {}
  );
  const [faceitStats, setFaceitStats] = useReducer(faceitStatsReducer, {});
  const [steamFriends, setSteamFriends] = useReducer(friendsListReducer, {});
  const [steamStats, setSteamStats] = useReducer(userStatsForGameReducer, {});

  React.useEffect(() => {
    const getSteamProfile = async () => {
      try {
        const { data } = await apiInstance(
          `/api/v2/steam/getplayersummaries/${steamId}`
        );
        setSteamProfile(data);
      } catch (e) {}
    };
    const getFaceitProfile = async () => {
      try {
        const { data } = await apiInstance(`/api/v2/faceit/players/${steamId}`);
        setFaceitProfile(data);
        return data.player_id;
      } catch (e) {
        return false;
      }
    };
    const getSteamFriends = async () => {
      try {
        const { data } = await apiInstance(
          `/api/v2/steam/getfriendlist/${steamId}`
        );
        setSteamFriends(data);
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
    const getFaceitHistory = async (faceitId) => {
      try {
        const { data } = await apiInstance(
          `/api/v2/faceit/history/${faceitId}`
        );
        setFaceitHistory(data);
      } catch (e) {}
    };
    const getFaceitStats = async (faceitId) => {
      try {
        const { data } = await apiInstance(`/api/v2/faceit/stats/${faceitId}`);
        setFaceitStats(data);
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
    const fetchData = async () => {
      if (!steamId) return;

      await getSteamProfile();
      await getSteamFriends();
      await getRecentlyPlayedGames();
      await getSteamFriends();
      await getAchievements();
      await getSteamStats();

      const faceitId = await getFaceitProfile();
      if (!faceitId) return;

      await getFaceitHistory(faceitId);
      await getFaceitStats(faceitId);
    };
    fetchData();
  }, []);

  const CircularButton = ({ children, link }) => {
    return (
      <a href={link}>
        <button
          type="button"
          className="btn btn-outline-dark btn-circle btn-sm"
          key={children.type.name}
        >
          {children}
        </button>
      </a>
    );
  };

  return (
    <div className="Profile container p-3">
      <div className="row gutters-sm">
        <div className="col-md-3 mb-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">
                <img
                  src={steamProfile.avatar}
                  alt="Avatar"
                  className="rounded-circle"
                  width="150"
                />
                <div className="mt-3">
                  <h4>{steamProfile.nickname}</h4>
                  <p className="text-secondary mb-1">
                    {faceitProfile.nickname}
                  </p>
                  <CircularButton link={faceitProfile.url}>
                    <FaceitLogo />
                  </CircularButton>
                  <CircularButton link={steamProfile.url}>
                    <SteamLogo />
                  </CircularButton>
                  {steamId && (
                    <a
                      href={`https://faceitfinder.com/profile/${steamId}`}
                      className="d-flex"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="btn btn-dark">
                        Go to Faceitfinder
                      </button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <SteamGeneral
          steamFriends={steamFriends}
          recentlyPlayedGames={recentlyPlayedGames}
          steamProfile={steamProfile}
          achievements={achievements}
          steamStats={steamStats}
        />
      </div>
      <FaceitLifetime faceitStats={faceitStats} faceitProfile={faceitProfile} />
      <FaceitCurrent faceitHistory={faceitHistory} />
      <FaceitMaps faceitStats={faceitStats} />
    </div>
  );
};

export default Player;
