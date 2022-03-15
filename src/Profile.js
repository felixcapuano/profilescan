import { useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id: profileId } = useParams();

  const [profile, setProfile] = useState({
    steam: {
      username: "username",
      hoursPlayed: 0,
      hoursPlayedLastWeek: 0,
      steamId: "steamid",
      numberFriend: 0,
    },
  });

  return (
    <div className="Profile">
      <h1>CSGO account scanner </h1>
      <p>Profile id : {profileId}</p>
      <p>Steam username : {profile.steam.username}</p>
      <p>Steam id : {profile.steam.steamId}</p>
      <p>Number of friend : {profile.steam.numberFriend}</p>
      <p>Hours Played : {profile.steam.hoursPlayed}</p>
      <p>Hours Played (last 2 week) : {profile.steam.hoursPlayedLastWeek}</p>
    </div>
  );
};

export default Profile;
