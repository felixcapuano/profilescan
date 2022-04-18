const axios = require("axios");

let API_HOST = "";

if (process.env.NODE_ENV === "development") {
  API_HOST = `http://localhost:3000`;
}

const apiInstance = axios.create({
  baseURL: API_HOST + "/api/v2",
});

module.exports = { apiInstance };
