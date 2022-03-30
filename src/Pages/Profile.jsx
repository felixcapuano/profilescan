import React from "react";
import { useEffect, useReducer } from "react";
import { apiInstance } from "../services/globals";
// import { time_converter } from "../services/utils";
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
    <div className="Profile container">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  alt="Admin"
                  className="rounded-circle"
                  width="150"
                />
                <div className="mt-3">
                  <h4>Steam Username</h4>
                  <p className="text-secondary mb-1">Faceit Username</p>
                  <button
                    type="button"
                    className="btn btn-outline-dark btn-circle btn-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 32 32"
                    >
                      <path d="M32 3.599c0-0.13-0.135-0.266-0.135-0.266-0.13 0-0.13 0-0.266 0.135-2.667 4.13-5.464 8.266-8.13 12.531h-23.203c-0.266 0-0.401 0.401-0.13 0.531 9.599 3.604 23.599 9.068 31.333 12.135 0.266 0.135 0.531-0.135 0.531-0.266z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-dark btn-circle btn-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-steam"
                      viewBox="0 0 16 16"
                    >
                      <path d="M.329 10.333A8.01 8.01 0 0 0 7.99 16C12.414 16 16 12.418 16 8s-3.586-8-8.009-8A8.006 8.006 0 0 0 0 7.468l.003.006 4.304 1.769A2.198 2.198 0 0 1 5.62 8.88l1.96-2.844-.001-.04a3.046 3.046 0 0 1 3.042-3.043 3.046 3.046 0 0 1 3.042 3.043 3.047 3.047 0 0 1-3.111 3.044l-2.804 2a2.223 2.223 0 0 1-3.075 2.11 2.217 2.217 0 0 1-1.312-1.568L.33 10.333Z" />
                      <path d="M4.868 12.683a1.715 1.715 0 0 0 1.318-3.165 1.705 1.705 0 0 0-1.263-.02l1.023.424a1.261 1.261 0 1 1-.97 2.33l-.99-.41a1.7 1.7 0 0 0 .882.84Zm3.726-6.687a2.03 2.03 0 0 0 2.027 2.029 2.03 2.03 0 0 0 2.027-2.029 2.03 2.03 0 0 0-2.027-2.027 2.03 2.03 0 0 0-2.027 2.027Zm2.03-1.527a1.524 1.524 0 1 1-.002 3.048 1.524 1.524 0 0 1 .002-3.048Z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-dark btn-circle btn-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-twitch"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0H3.857zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142v6.286z" />
                      <path d="M11.857 3.143h-1.143V6.57h1.143V3.143zm-3.143 0H7.571V6.57h1.143V3.143z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="card mt-3">
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 className="mb-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-globe mr-2 icon-inline"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  Steam
                </h6>
                <span className="text-secondary">https://bootdey.com</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 className="mb-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-github mr-2 icon-inline"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  Faceit
                </h6>
                <span className="text-secondary">bootdey</span>
              </li>
            </ul>
          </div> */}
        </div>
        <div className="col-md-8">
          <div className="card mb-3">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Account status</h6>
                </div>
                <div className="col-sm-9 text-secondary">public</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Created</h6>
                </div>
                <div className="col-sm-9 text-secondary">08.2012</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Play CSGO since</h6>
                </div>
                <div className="col-sm-9 text-secondary">03.2014</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Friends</h6>
                </div>
                <div className="col-sm-9 text-secondary">319 (42 banned)</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Time played</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  2500h (35h last 2 weeks)
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Achievement</h6>
                </div>
                <div className="col-sm-9 text-secondary">Not Hacked</div>
              </div>
            </div>

            <div className="row gutters-sm">
              {/* <div className="col-sm-6 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="d-flex align-items-center mb-3">
                      <i className="material-icons text-info mr-2">assignment</i>
                      Project Status
                    </h6>
                    <small>Web Design</small>
                    <div className="progress mb-3 progressBar">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "80%" }}
                        aria-valuenow="80"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small>Website Markup</small>
                    <div className="progress mb-3 progressBar">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "72%" }}
                        aria-valuenow="72"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small>One Page</small>
                    <div className="progress mb-3 progressBar">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "89%" }}
                        aria-valuenow="89"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small>Mobile Template</small>
                    <div className="progress mb-3 progressBar">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "55%" }}
                        aria-valuenow="55"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small>Backend API</small>
                    <div className="progress mb-3 progressBar">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "66%" }}
                        aria-valuenow="66"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="d-flex align-items-center mb-3">
                      <i className="material-icons text-info mr-2">assignment</i>
                      Project Status
                    </h6>
                    <small>Web Design</small>
                    <div className="progress mb-3 progressBar">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "80%" }}
                        aria-valuenow="80"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small>Website Markup</small>
                    <div className="progress mb-3 progressBar">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "72%" }}
                        aria-valuenow="72"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small>One Page</small>
                    <div className="progress mb-3 progressBar">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "89%" }}
                        aria-valuenow="89"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small>Mobile Template</small>
                    <div className="progress mb-3 progressBar">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "55%" }}
                        aria-valuenow="55"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small>Backend API</small>
                    <div className="progress mb-3 progressBar">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "66%" }}
                        aria-valuenow="66"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// example https://www.bootdey.com/snippets/view/profile-with-data-and-skills#html

export default Profile;
