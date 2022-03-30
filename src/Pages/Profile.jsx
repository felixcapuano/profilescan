import React from "react";
import { useEffect, useReducer } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { apiInstance } from "../services/globals";
import { time_converter } from "../services/utils";
import "../styles/profile.css";

const Profile = () => {
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
      playerName: "",
    },
  };

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
      case "faceitProfile":
        if (d.games.csgo) {
          p.faceit.faceitElo = d.games.csgo.faceit_elo;
          p.faceit.skillLevel = d.games.csgo.skill_level;
          p.faceit.playerName = d.nickname;
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
            setProfile({ ...data, type: "faceitProfile" });
          })
          .catch(console.error);
      })
      .catch(console.error);
  }, []);

  return (
    <Container className="Profile">
      <Row>
        <Col>
          <Card>hello</Card>
        </Col>
      </Row>
    </Container>
  );
};
// example https://www.bootdey.com/snippets/view/profile-with-data-and-skills#html

export default Profile;
