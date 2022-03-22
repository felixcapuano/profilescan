import { useEffect, useReducer } from "react";
import { apiInstance } from "./globals";

const time_converter = (num) => {
  const hours = Math.floor(num / 60);
  const minute = num % 60;
  return `${hours}h ${minute}m`;
};

const Profile = () => {
  const [profile, setProfile] = useReducer(
    (p, d) => {
      switch (d.type) {
        case "steamPage":
          p.steam.id = d.profile.steamID64.toString();
          p.steam.vacban = parseInt(d.profile.vacBanned.toString());
          p.steam.memberSince = Date.parse(d.profile.memberSince.toString());
          p.steam.username = d.profile.steamID.toString();
          p.steam.location = d.profile.location.toString();
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
            p.steam.minPlayed = d.games.filter(
              ({ appid }) => appid === 730
            )[0].playtime_forever;
            p.steam.minPlayedTwoWeek = d.games.filter(
              ({ appid }) => appid === 730
            )[0].playtime_2weeks;
          }
          break;
        default:
          break;
      }
      return { ...p };
    },
    { steam: {} }
  );

  useEffect(() => {
    apiInstance(`/api/v1/steam/getcommunityprofile`, {
      params: { path: window.location.pathname },
    })
      .then(({ data }) => {
        setProfile({ ...data, type: "steamPage" });
        return data.profile.steamID64.toString();
      })
      .then((steamId) => {
        apiInstance(`/api/v1/steam/getfriendlist/${steamId}`)
          .then(({ data }) => {
            setProfile({ ...data, type: "friendsList" });
          })
          .catch(console.error);

        apiInstance(`/api/v1/steam/getrecentlyplayedgames/${steamId}`)
          .then(({ data }) => {
            setProfile({ ...data, type: "recentlyPlayedGames" });
          })
          .catch(console.error);

        apiInstance(`/api/v1/steam/getplayerachievements/${steamId}`)
          .then(({ data }) => {
            setProfile({ ...data, type: "playerAchievements" });
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
    </div>
  );
};

export default Profile;
