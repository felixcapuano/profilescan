import axios from "axios";
import { useEffect, useReducer } from "react";
import { API_HOST } from "./globals";

const Profile = () => {
  const [profile, setProfile] = useReducer((currentProfile, profile) => {
    switch (profile.type) {
      case "steamPage":
        return {
          ...currentProfile,
          steam: {
            id: profile.steamID64.toString(),
            vacban: parseInt(profile.vacBanned.toString()),
            memberSince: Date.parse(profile.memberSince.toString()),
            username: profile.steamID.toString(),
            location: profile.location.toString(),
            hoursPlayed: 0,
            hoursPlayedLastWeek: 0,
            numberFriend: 0,
          },
        };
        break;

      default:
        return currentProfile;
        break;
    }
  }, {});

  useEffect(() => {
    axios(
      `${API_HOST}/api/v1/steam/findcommunityprofile?path=${window.location.pathname}`
    )
      .then(({ data }) => setProfile({ ...data["profile"], type: "steamPage" }))
      .catch(console.error);
  }, []);

  return (
    <div className="Profile">
      <h1>CSGO account scanner </h1>
      <p>Profile id : {profile?.steam?.id}</p>
      <p>Steam username : {profile?.steam?.username}</p>
      <p>
        Member since : {new Date(profile?.steam?.memberSince).toDateString()}
      </p>
      <p>Location : {profile?.steam?.location || "private"}</p>
      <p>VAC ban : {profile?.steam?.vacBan ? "yes" : "no"}</p>
      <p>Number of friend : {profile?.steam?.numberFriend}</p>
      <p>Hours Played : {profile?.steam?.hoursPlayed}</p>
      <p>Hours Played (last 2 week) : {profile?.steam?.hoursPlayedLastWeek}</p>
    </div>
  );
};

export default Profile;
