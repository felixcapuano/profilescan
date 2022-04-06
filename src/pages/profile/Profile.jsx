import React, { useReducer, useRef } from "react";
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
import { minutes_to_hours } from "../../services/utils";
import FaceitLifetime from "./components/FaceitLifetime";

const Profile = () => {
  const ids = useRef({ steam: "null", faceit: "null" });
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

  const renderMainInfo = ({ key = "", value = "" }) => {
    return (
      <div key={`${key}${value}`}>
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">{key}</h6>
          </div>
          <div className="col-sm-9 text-secondary">{value}</div>
        </div>
        <hr />
      </div>
    );
  };

  const mainInfo = [
    { key: "Account status", value: "public" },
    { key: "Created", value: "08.2012" },
    { key: "Play CSGO since", value: "03.2014" },
    { key: "Friends", value: `${steamFriends.count} (XX banned)` },
    {
      key: "Time played",
      value: `${minutes_to_hours(
        recentlyPlayedGames.minutesPlayed
      )} hours (${minutes_to_hours(
        recentlyPlayedGames.minutesPlayedLast2Weeks
      )}h last 2 weeks)`,
    },
    { key: "Achievements", value: "Not Hacked" },
  ];

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
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="card mb-3">
            <div className="card-body">{mainInfo.map(renderMainInfo)}</div>
          </div>
        </div>
      </div>
      <FaceitLifetime faceitStats={faceitStats} faceitProfile={faceitProfile} />
      {/* <div className="row gutters-sm">
        <div className="col-sm-6 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <h6 className="d-flex align-items-center mb-3">Steam</h6>
              {steamInfo.map(renderSecondaryInfo)}
            </div>
          </div>
        </div>
        <div className="col-sm-6 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <h6 className="d-flex align-items-center mb-3">Faceit</h6>
              <FaceitLvlIcon level={faceitProfile.level} />
              {faceitInfo.map(renderSecondaryInfo)}
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Profile;
