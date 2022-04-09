import React, { useState, useEffect } from "react";
import { apiInstance } from "../../services/globals";
import { getIdFromPathname, isValidSteamId } from "../../services/utils";
import Player from "./components/Player";
import "./profile.css";

const Profile = () => {
  const [steamId, setSteamId] = useState({ status: 0, id: "" });

  useEffect(() => {
    const rawId = getIdFromPathname(window.location.pathname);
    if (!rawId) return setSteamId({ status: 2, id: "" });

    if (!isValidSteamId(rawId)) {
      apiInstance(`/api/v2/steam/getsteamid/${rawId}`)
        .then(({ data }) => {
          console.log(data);
          setSteamId({ status: 1, id: data.steamid });
        })
        .catch((e) => {
          console.error(e);
          setSteamId({ status: 2, id: "" });
        });
    } else {
      setSteamId({ status: 1, id: rawId });
    }
  }, [setSteamId]);

  switch (steamId.status) {
    case 1: // id found
      return <div>Found {steamId.id}</div>;

    case 2: // id not found
      return <div>Not found</div>;

    default:
      // wait for id
      return <div>Waiting</div>;
  }
};

export default Profile;
