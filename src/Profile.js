import { useEffect, useReducer } from "react";
import { apiInstance } from "./globals";

const time_converter = (num) => {
  const hours = Math.floor(num / 60);
  const minute = num % 60;
  return `${hours}h ${minute}m`;
};

const initialProfile = {
  steam: {
    id: "",
    vacban: "",
    memberSince: "",
    username: "",
    location: "",
    numberFriend: "",
    achievementCompleted: "",
    achievementHacked: "",
    minPlayed: "",
    minPlayedTwoWeek: "",
  },
  faceit: {
    faceitElo: 0,
    skillLevel: 0,
    gamePlayerName: "",
  },
};

const Profile = () => {
  const [profile, setProfile] = useReducer((p, d) => {
    switch (d.type) {
      case "steamPage":
        p.steam.id = d.steamID64.toString();
        p.steam.vacban = parseInt(d.vacBanned.toString());
        p.steam.memberSince = Date.parse(d.memberSince.toString());
        p.steam.username = d.steamID.toString();
        p.steam.location = d.location.toString();
        break;
      case "friendsList":
        p.steam.numberFriend = d.friends.length;
        break;
      case "playerAchievements":
        p.steam.achievementCompleted = d.achievements.filter(
          ({ achieved }) => achieved === 1
        ).length;
        p.steam.achievementHacked = d.achievements.every(
          ({ unlocktime }) => unlocktime === d.achievements[0].unlocktime
        );
        break;
      case "recentlyPlayedGames":
        if (d.total_count > 0) {
          const csgo = (p.steam.minPlayed = d.games.filter(
            ({ appid }) => appid === 730
          ));
          if (csgo.length > 0) {
            p.steam.minPlayed = csgo[0].playtime_forever;
            p.steam.minPlayedTwoWeek = csgo[0].playtime_2weeks;
          }
        }
        break;
      case "playerFaceit":
        if (d.games.csgo) {
          p.faceit.faceitElo = d.games.faceit_elo;
          p.faceit.skillLevel = d.games.skill_level;
          p.faceit.gamePlayerName = d.nickname;
        }
        break;
      default:
        break;
    }
    return { ...p };
  }, initialProfile);

  useEffect(() => {
    apiInstance(`/api/v2/steam/getcommunityprofile`, {
      params: { path: encodeURI(window.location.pathname) },
    })
      .then(({ data }) => {
        setProfile({ ...data, type: "steamPage" });
        return data.steamID64.toString();
      })
      .then((steamId) => {
        apiInstance(`/api/v2/steam/getfriendlist/${steamId}`)
          .then(({ data }) => {
            setProfile({ ...data, type: "friendsList" });
          })
          .catch(console.error);

        apiInstance(`/api/v2/steam/getrecentlyplayedgames/${steamId}`)
          .then(({ data }) => {
            setProfile({ ...data, type: "recentlyPlayedGames" });
          })
          .catch(console.error);

        apiInstance(`/api/v2/steam/getplayerachievements/${steamId}`)
          .then(({ data }) => {
            // give id look for use this instead of getcommunity profile
            setProfile({ ...data, type: "playerAchievements" });
          })
          .catch(console.error);

        apiInstance(`/api/v2/faceit/players/${steamId}`)
          .then(({ data }) => {
            // give id look for use this instead of getcommunity profile
            console.log(data);
            // setProfile({ ...data, type: "faceitProfile" });
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
      <p>Member since : {new Date(profile.steam.memberSince).toDateString()}</p>
      <p>Location : {profile.steam.location || "private"}</p>
      <p>VAC ban : {profile.steam.vacBan ? "yes" : "no"}</p>
      <p>Number of friend : {profile.steam.numberFriend}</p>
      <p>Time Played : {time_converter(profile.steam.minPlayed)}</p>
      <p>
        Time Played (last 2 week) :{" "}
        {time_converter(profile.steam.minPlayedTwoWeek)}
      </p>
      <p>
        Achievements completed : {`${profile.steam.achievementCompleted}/167`}
      </p>
      <p>Achievements hacked : {profile.steam.achievementHacked.toString()}</p>
      {/* <p>Faceit Lvl : {profile.steam.achievementHacked.toString()}</p> */}
    </div>
  );
};

export default Profile;
