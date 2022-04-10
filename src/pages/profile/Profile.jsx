import React, { useState, useEffect } from "react";
import { apiInstance } from "../../services/globals";
import { getIdFromPathname, isValidSteamId } from "../../services/utils";
import PlayerProfile from "../../components/PlayerProfile";
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
      return <PlayerProfile steamId={steamId.id} />;

    case 2: // id not found
      return (
        <div className="text-center fs-1 text-muted p-5 m-5">
          🤷‍♀️ USER NOT FOUND 🤷‍♂️
        </div>
      );

    default:
      // wait for id
      return (
        <div className="d-flex justify-content-center p-5 m-5">
          <div
            className="spinner-border"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
  }
};

export default Profile;
