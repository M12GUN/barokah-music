import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "e4ff4b02836b41e59a70ff9ad30f0150";
const redirectUri = "https://radiant-zabaione-d47d21.netlify.app/";
const scopes = ["user-library-read", "playlist-read-private"];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

export default apiClient;