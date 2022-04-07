import React, { useReducer } from "react";
import { apiInstance } from "../../services/globals";
import "./profile.css";
// import TwitchLogo from "./icons/TwitchLogo";
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
} from "../../services/steamReducers";
import FaceitLifetime from "./components/FaceitLifetime";
import SteamGeneral from "./components/SteamGeneral";
import FaceitCurrent from "./components/FaceitCurrent";

const Profile = () => {
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

  React.useEffect(() => {
    const getSteamProfile = async () => {
      const { data } = await apiInstance(`/api/v2/steam/getcommunityprofile`, {
        params: { path: encodeURI(window.location.pathname) },
      });
      console.log("steamprofile", data);
      setSteamProfile(data);
      return data.steamID64;
    };
    const getFaceitProfile = async (steamId) => {
      const { data } = await apiInstance(`/api/v2/faceit/players/${steamId}`);
      console.log("faceitprofile", data);
      setFaceitProfile(data);
      return data.player_id;
    };
    const getSteamFriends = async (steamId) => {
      const { data } = await apiInstance(
        `/api/v2/steam/getfriendlist/${steamId}`
      );
      console.log("steamfriends", data);
      setSteamFriends(data);
    };
    const getAchievements = async (steamId) => {
      const { data } = await apiInstance(
        `/api/v2/steam/getplayerachievements/${steamId}`
      );
      console.log("achievements", data);
      setAchievements(data);
    };
    const getRecentlyPlayedGames = async (steamId) => {
      const { data } = await apiInstance(
        `/api/v2/steam/getrecentlyplayedgames/${steamId}`
      );
      console.log("recentlyplayedgames", data);
      setRecentlyPlayedGames(data);
    };
    const getFaceitHistory = async (faceitId) => {
      const { data } = await apiInstance(`/api/v2/faceit/history/${faceitId}`);
      console.log("faceithistory", data);
      setFaceitHistory(data);
    };
    const getFaceitStats = async (faceitId) => {
      const { data } = await apiInstance(`/api/v2/faceit/stats/${faceitId}`);
      console.log("faceitstats", data);
      setFaceitStats(data);
    };
    const fetchData = async () => {
      try {
        console.log("///////////////////////////////");
        console.log("/////////////start/////////////");
        console.log("///////////////////////////////");
        const steamId = await getSteamProfile();

        await getSteamFriends(steamId);
        await getRecentlyPlayedGames(steamId);
        await getSteamFriends(steamId);
        await getAchievements(steamId);

        const faceitId = await getFaceitProfile(steamId);

        await getFaceitHistory(faceitId);
        await getFaceitStats(faceitId);
        console.log("///////////////////////////////");
        console.log("//////////////end//////////////");
        console.log("///////////////////////////////");
      } catch (error) {
        console.log(error);
      }
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
    <div className="Profile container">
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
        />
      </div>
      <FaceitLifetime faceitStats={faceitStats} faceitProfile={faceitProfile} />
      <FaceitCurrent faceitHistory={faceitHistory} />
    </div>
  );
};

export default Profile;
