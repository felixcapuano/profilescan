import React from "react";
import { apiInstance } from "../../services/globals";
import { fetchUserInfos } from "../../services/fetchUserInfo";
import "./profile.css";
import TwitchLogo from "./icons/TwitchLogo";
import SteamLogo from "./icons/SteamLogo";
import FaceitLogo from "./icons/FaceitLogo";

const Profile = () => {
  const [profile, setProfile] = React.useState([]);

  React.useEffect(() => {
    apiInstance(`/api/v2/steam/getcommunityprofile`, {
      params: { path: encodeURI(window.location.pathname) },
    })
      .then(({ data }) => {
        setProfile(fetchUserInfos(data, "steamPage", profile));
        return data.steamID64.toString();
      })
      .then((steamId) => {
        apiInstance(`/api/v2/steam/getfriendlist/${steamId}`)
          .then(({ data }) => {
            setProfile(fetchUserInfos(data, "friendsList", profile));
          })
          .catch(console.error);

        apiInstance(`/api/v2/steam/getrecentlyplayedgames/${steamId}`)
          .then(({ data }) => {
            setProfile(fetchUserInfos(data, "recentlyPlayedGames", profile));
          })
          .catch(console.error);

        apiInstance(`/api/v2/steam/getplayerachievements/${steamId}`)
          .then(({ data }) => {
            setProfile(fetchUserInfos(data, "playerAchievements", profile));
          })
          .catch(console.error);

        apiInstance(`/api/v2/faceit/players/${steamId}`)
          .then(({ data }) => {
            // give id look for use this instead of getcommunity profile
            setProfile(fetchUserInfos(data, "faceitProfile", profile));
          })
          .catch(console.error);
      })
      .catch(console.error);
  }, []);

  const renderCircularButton = (children) => {
    return (
      <button type="button" className="btn btn-outline-dark btn-circle btn-sm">
        {children}
      </button>
    );
  };

  const mainInfo = [
    { key: "Account status", value: "public" },
    { key: "Created", value: "08.2012" },
    { key: "Play CSGO since", value: "03.2014" },
    { key: "Friends", value: "319 (42 banned)" },
    { key: "time played", value: "2500 (35h last 2 weeks)" },
    { key: "Achievements", value: "Not Hacked" },
  ];

  const renderMainInfo = ({ key = "", value = "" }) => {
    return (
      <div>
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

  const faceitInfo = [
    { key: "Level", value: "5" },
    { key: "ELO", value: "3507" },
    { key: "Matchs", value: "1231" },
    { key: "K/D", value: "2.80" },
    { key: "Wins", value: "923" },
    { key: "Headshots", value: "63%" },
  ];

  const steamInfo = [];

  const renderSecondaryInfo = ({ key = "", value = "" }) => {
    return (
      <div className="row">
        <div className="col-sm-3">
          <h6 className="mb-0">{key}</h6>
        </div>
        <div className="col-sm-9 text-secondary">{value}</div>
      </div>
    );
  };

  return (
    <div className="Profile container">
      <div className="row gutters-sm">
        <div className="col-md-2 mb-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  alt="Admin"
                  className="rounded-circle"
                  width="150"
                />
                <div className="mt-3">
                  <h4>Steam Username</h4>
                  <p className="text-secondary mb-1">Faceit Username</p>
                  {[<FaceitLogo />, <SteamLogo />, <TwitchLogo />].map(
                    renderCircularButton
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-10">
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
              {faceitInfo.map(renderSecondaryInfo)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
