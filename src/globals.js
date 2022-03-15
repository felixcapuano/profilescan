let API_HOST = "";
if (process.env.NODE_ENV === "development") {
  API_HOST = `http://localhost:${process.env.REACT_APP_SERVER_PORT}`;
}

module.exports = { API_HOST };
