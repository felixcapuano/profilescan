import { useEffect, useReducer } from "react";
import { apiInstance } from "./globals";

const Profile = () => {
  const [profile, setProfile] = useReducer((p, d) => {
    switch (d.type) {
      case "steamPage":
        p.steam.id = d.profile.steamID64.toString();
        p.steam.vacban = parseInt(d.profile.vacBanned.toString());
        p.steam.memberSince = Date.parse(d.profile.memberSince.toString());
        p.steam.username = d.profile.steamID.toString();
        p.steam.location = d.profile.location.toString();
        break;
      case "friendsList":
        p.steam.numberFriend = d.friends.length
        break;
      case "playerAchievements":
        p.steam.achievementCompleted = d.achievements.filter(
          ({ achieved }) => achieved === 1
        ).length;
        break;
      case "recentlyPlayedGames":
        if (d.total_count > 0) {
          p.steam.hoursPlayed = d.games.filter(({ appid }) => appid === 730)[0].playtime_forever;
          p.steam.hoursPlayedTwoWeek = d.games.filter(({ appid }) => appid === 730)[0].playtime_2weeks;
        }
        break
    }
    return p;
  }, { steam: {} });

  useEffect(() => {
    apiInstance(
      `/api/v1/steam/getcommunityprofile`,
      { params: { path: window.location.pathname } }
    )
      .then(({ data }) => {
        setProfile({ ...data, type: "steamPage" })
        return data.profile.steamID64.toString();
      })
      .then(steamId => {

        apiInstance(`/api/v1/steam/getfriendlist/${steamId}`)
          .then(({ data }) => {
            setProfile({ ...data, type: "friendsList" })
          })
          .catch(console.error);

        apiInstance(`/api/v1/steam/getrecentlyplayedgames/${steamId}`)
          .then(({ data }) => {
            setProfile({ ...data, type: "recentlyPlayedGames" })
          })
          .catch(console.error);

        apiInstance(`/api/v1/steam/getplayerachievements/${steamId}`)
          .then(({ data }) => {
            setProfile({ ...data, type: "playerAchievements" })
          })
          .catch(console.error);

      })
      .catch(console.error);

  }, []);

  return (
    <div className="Profile">
      <h1>CSGO account scanner </h1>
      <p>Profile id : {profile.steam.id}</p>
      <p>Steam username : {profile.steam.username}</p>
      <p>
        Member since : {new Date(profile.steam.memberSince).toDateString()}
      </p>
      <p>Location : {profile.steam.location || "private"}</p>
      <p>VAC ban : {profile.steam.vacBan ? "yes" : "no"}</p>
      <p>Number of friend : {profile.steam.numberFriend}</p>
      <p>Hours Played : {profile.steam.hoursPlayed}</p>
      <p>Hours Played (last 2 week) : {profile.steam.hoursPlayedTwoWeek}</p>
      <p>achievement completed : {profile.steam.achievementCompleted ? `${profile.steam.achievementCompleted}/167` : "private"}</p>
    </div>
  );
};

export default Profile;
