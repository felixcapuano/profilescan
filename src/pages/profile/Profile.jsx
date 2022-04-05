import React, { useReducer } from "react";
import { apiInstance } from "../../services/globals";
import "./profile.css";
// import TwitchLogo from "./icons/TwitchLogo";
import SteamLogo from "./icons/SteamLogo";
import FaceitLogo from "./icons/FaceitLogo";
import FaceitLvlIcon from "./icons/FaceitLvlIcon";
import { faceitProfileReducer } from "../../services/faceitReducer";
import {
  communityProfileReducer,
  friendsListReducer,
  playerAchievementsReducer,
  recentlyPlayedGamesReducer,
} from "../../services/steamReducers";
import { minutes_to_hours } from "../../services/utils";

const Profile = () => {
  const [faceitProfile, setFaceitProfile] = useReducer(
    faceitProfileReducer,
    {}
  );
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
  const [steamFriends, setSteamFriends] = useReducer(friendsListReducer, {});

  React.useEffect(() => {
    apiInstance(`/api/v2/steam/getcommunityprofile`, {
      params: { path: encodeURI(window.location.pathname) },
    })
      .then(({ data }) => {
        setSteamProfile(data);
        return data.steamID64;
      })
      .then((steamId) => {
        apiInstance(`/api/v2/steam/getfriendlist/${steamId}`)
          .then(({ data }) => data)
          .then(setSteamFriends)
          .catch(console.error);

        apiInstance(`/api/v2/steam/getrecentlyplayedgames/${steamId}`)
          .then(({ data }) => data)
          .then(setRecentlyPlayedGames)
          .catch(console.error);

        apiInstance(`/api/v2/steam/getplayerachievements/${steamId}`)
          .then(({ data }) => data)
          .then(setAchievements)
          .catch(console.error);

        apiInstance(`/api/v2/faceit/players/${steamId}`)
          .then(({ data }) => data)
          .then(setFaceitProfile)
          .catch(console.error);
      })
      .catch(console.error);
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

  const renderSecondaryInfo = ({ key = "", value = "" }) => {
    return (
      <div className="row" key={`${key}${value}`}>
        <div className="col-sm-3">
          <h6 className="mb-0">{key}</h6>
        </div>
        <div className="col-sm-9 text-secondary">{value}</div>
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

  const faceitInfo = [
    { key: "Level", value: faceitProfile.level },
    { key: "ELO", value: faceitProfile.elo },
    { key: "Matchs", value: "1231" },
    { key: "K/D", value: "2.80" },
    { key: "Wins", value: "923" },
    { key: "Headshots", value: "63%" },
  ];

  const steamInfo = [];

  // const socialIcons = [<FaceitLogo />, <SteamLogo />, <TwitchLogo />];

  return (
    <div className="Profile container">
      {"faceitProfile : " + JSON.stringify(faceitProfile)}
      <br />
      {"steamFriends : " + JSON.stringify(steamFriends)}
      <br />
      {"steamProfile : " + JSON.stringify(steamProfile)}
      <br />
      {"recentlyPlayedGames : " + JSON.stringify(recentlyPlayedGames)}
      <br />
      {"achievements : " + JSON.stringify(achievements)}
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
      <div className="row gutters-sm">
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
              <FaceitLvlIcon level={0} />
              {faceitInfo.map(renderSecondaryInfo)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;