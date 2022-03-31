import React from "react";
import { apiInstance } from "../../services/globals";
import { fetchUserInfos } from "../../services/fetchUserInfo";
import "./profile.css";

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

  return (
    <div className="background-container">
      {profile.map((profilElement) => {
        return <div className="row">
          <div className="col-6">
            {Object.keys(profilElement)[0]}
          </div>
          <div className="col-6">
            {Object.values(profilElement)[0]}
          </div>
        </div>
      })}
    </div>
  );
};

export default Profile;
