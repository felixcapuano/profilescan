import React, { useReducer, useState } from "react";
import { apiInstance } from "../../services/globals";
import "./profile.css";
import SteamLogo from "./icons/SteamLogo";
import FaceitLogo from "./icons/FaceitLogo";
import {
  faceitHistoryReducer,
  faceitProfileReducer,
  faceitStatsReducer,
} from "../../services/faceitReducer";
import {
  communityProfileReducer,
  friendsListReducer,
  playerAchievementsReducer,
  recentlyPlayedGamesReducer,
  userStatsForGameReducer,
} from "../../services/steamReducers";
import FaceitLifetime from "./components/FaceitLifetime";
import SteamGeneral from "./components/SteamGeneral";
import FaceitCurrent from "./components/FaceitCurrent";
import FaceitMaps from "./components/FaceitMaps";

const Profile = () => {
  const [playerFound, setPlayerFound] = useState(false);

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
          `/api/v2/steam/getcommunityprofile`,
          {
            params: { path: encodeURI(window.location.pathname) },
          }
        );
        setSteamProfile(data);
        return data.steamID64;
      } catch (e) {
        console.error(e);
        return false;
      }
    };
    const getFaceitProfile = async (steamId) => {
      try {
        const { data } = await apiInstance(`/api/v2/faceit/players/${steamId}`);
        setFaceitProfile(data);
        return data.player_id;
      } catch (e) {
        console.error(e);
        return false;
      }
    };
    const getSteamFriends = async (steamId) => {
      try {
        const { data } = await apiInstance(
          `/api/v2/steam/getfriendlist/${steamId}`
        );
        // console.log("steamfriends", data);
        setSteamFriends(data);
      } catch (e) {
        console.error(e);
      }
    };
    const getAchievements = async (steamId) => {
      try {
        const { data } = await apiInstance(
          `/api/v2/steam/getplayerachievements/${steamId}`
        );
        setAchievements(data);
      } catch (e) {
        console.error(e);
      }
    };
    const getRecentlyPlayedGames = async (steamId) => {
      try {
        const { data } = await apiInstance(
          `/api/v2/steam/getrecentlyplayedgames/${steamId}`
        );
        setRecentlyPlayedGames(data);
      } catch (e) {
        console.error(e);
      }
    };
    const getFaceitHistory = async (faceitId) => {
      try {
        const { data } = await apiInstance(
          `/api/v2/faceit/history/${faceitId}`
        );
        setFaceitHistory(data);
      } catch (e) {
        console.error(e);
      }
    };
    const getFaceitStats = async (faceitId) => {
      try {
        const { data } = await apiInstance(`/api/v2/faceit/stats/${faceitId}`);
        setFaceitStats(data);
      } catch (e) {
        console.error(e);
      }
    };
    const getUserStatsForGame = async (steamId) => {
      try {
        const { data } = await apiInstance(
          `/api/v2/steam/getuserstatsforgame/${steamId}`
        );
        setSteamStats(data);
      } catch (e) {
        console.error(e);
      }
    };
    const fetchData = async () => {
      const steamId = await getSteamProfile();

      setPlayerFound(steamId ? true : false);
      if (!steamId) return;

      await getSteamFriends(steamId);
      await getRecentlyPlayedGames(steamId);
      await getSteamFriends(steamId);
      await getAchievements(steamId);
      await getUserStatsForGame(steamId);

      const faceitId = await getFaceitProfile(steamId);
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

  if (!playerFound) {
    return "player not found";
  }

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
                  {steamProfile.id && (
                    <a
                      href={`https://faceitfinder.com/profile/${steamProfile.id}`}
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

export default Profile;
