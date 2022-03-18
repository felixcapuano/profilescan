const axios = require("axios");

let API_HOST = "";
if (process.env.NODE_ENV === "development") {
  API_HOST = `http://localhost:${process.env.REACT_APP_SERVER_PORT}`;
}

const apiInstance = axios.create({
  baseURL: API_HOST,
})

module.exports = { apiInstance };
