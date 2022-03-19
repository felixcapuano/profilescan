import { useEffect, useReducer } from "react";
import { apiInstance } from "./globals";

const Profile = () => {
  const [profile, setProfile] = useReducer((profile, d) => {
    switch (d.type) {
      case "steamPage":
        return {
          ...profile,
          steam: {
            id: d.profile.steamID64.toString(),
            vacban: parseInt(d.profile.vacBanned.toString()),
            memberSince: Date.parse(d.profile.memberSince.toString()),
            username: d.profile.steamID.toString(),
            location: d.profile.location.toString(),
            hoursPlayed: 0,
            hoursPlayedLastWeek: 0,
          },
        };
      case "friendsList":
        return {
          ...profile,
          steam: { numberFriend: d.friends.length }
        }
      case "playerAchievements":
        return {
          ...profile,
          steam: {
            achievementCompleted: d.achievements.filter(
              ({ achieved }) => achieved === 1
            ).length
          }
        }
      default:
        return profile;
    }
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
            console.log(data)
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
      <p>Hours Played (last 2 week) : {profile.steam.hoursPlayedLastWeek}</p>
      <p>achievement completed : {profile.steam.achievementCompleted ? `${profile.steam.achievementCompleted}/167` : "private"}</p>
    </div>
  );
};

export default Profile;
