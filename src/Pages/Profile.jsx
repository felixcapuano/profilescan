import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { apiInstance } from "../services/globals";
import "../styles/profile.css";

const Profile = () => {
  const [profile, setProfile] = React.useState([]);

  React.useEffect(() => {
    apiInstance(`/api/v2/steam/getcommunityprofile`, {
      params: { path: encodeURI(window.location.pathname) },
    })
      .then(({ data }) => {
        fetchUserInfos(data, "steamPage");
        return data.steamID64.toString();
      })
      .then((steamId) => {
        apiInstance(`/api/v2/steam/getfriendlist/${steamId}`)
          .then(({ data }) => {
            fetchUserInfos(data, "friendsList");
          })
          .catch(console.error);

        apiInstance(`/api/v2/steam/getrecentlyplayedgames/${steamId}`)
          .then(({ data }) => {
            fetchUserInfos(data, "recentlyPlayedGames");
          })
          .catch(console.error);

        apiInstance(`/api/v2/steam/getplayerachievements/${steamId}`)
          .then(({ data }) => {
            // give id look for use this instead of getcommunity profile
            fetchUserInfos(data, "playerAchievements");
          })
          .catch(console.error);

        apiInstance(`/api/v2/faceit/players/${steamId}`)
          .then(({ data }) => {
            // give id look for use this instead of getcommunity profile
            fetchUserInfos(data, "faceitProfile");
          })
          .catch(console.error);
      })
      .catch(console.error);
  }, []);

  const fetchUserInfos = (data, type) => {
    const newInfos = [];
    if (type === "steamPage") {
      ["steamID64", "vacBanned", "memberSince", "steamID", "location"].forEach(el => data[el] ? newInfos.push({ [el]: Object.values(data[el])[0] }) : null)
    }
    if (type === "friendsList") {
      newInfos.push({ friendsNumber: data.friends.length })
    }
    if (type === "playerAchievements") {
      newInfos.push([{ achievementCompleted: data.achievements.filter(el => el.achieved === 1).length }])
      newInfos.push([{ achievementHacked: data.achievements.every(el => el === data.achievements[0].unlocktime) }])
    }
    if (type === "recentlyPlayedGames") {

    }
    if (type === "faceitProfile") {
      if (data.games.csgo) {
        newInfos.push({ faceitElo: data.games.csgo.faceit_elo })
        newInfos.push({ faceitLevel: data.games.csgo.skill_level })
        newInfos.push({ faceitNickname: data.nickname })
      }
    }
    const concatInfos = newInfos.concat(profile)
    console.log(concatInfos)
    setProfile(concatInfos)

  }

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

export default Profile;
