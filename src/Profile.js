import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_HOST } from "./globals";

const Profile = () => {
  const { id: profileId } = useParams();

  const [profile, setProfile] = useState({
    steam: {
      username: "username",
      hoursPlayed: 0,
      hoursPlayedLastWeek: 0,
      id: "steamid",
      numberFriend: 0,
      vacBan: 0,
      memberSince: 0,
    },
  });

  useEffect(() => {
    axios(
      `${API_HOST}/api/v1/steam/findcommunityprofile?path=${window.location.pathname}`
    )
      .then(({ data }) => {
        console.log(data.profile)
        setProfile((p) => ({
          ...p,
          steam: {
            id: data.profile.steamID64.toString(),
            vacban: parseInt(data.profile.vacBanned.toString()),
            memberSince: Date.parse(data.profile.memberSince.toString()),
          },
        }));
      })
      .catch((err) => {
        console.error(err);
      });
    return () => { };
  }, []);

  return (
    <div className="Profile">
      <h1>CSGO account scanner </h1>
      <p>Profile id : {profile.steam.id}</p>
      <p>VAC ban : {profile.steam.vacBan}</p>
      <p>Member since : {profile.steam.memberSince}</p>
      <p>Steam username : {profile.steam.username}</p>
      <p>Number of friend : {profile.steam.numberFriend}</p>
      <p>Hours Played : {profile.steam.hoursPlayed}</p>
      <p>Hours Played (last 2 week) : {profile.steam.hoursPlayedLastWeek}</p>
    </div>
  );
};

export default Profile;
