import axios from "axios";

const api = axios.create({
  baseURL:
    "https://crows-back-api-d2azg3hke2ejhbcq.brazilsouth-01.azurewebsites.net/api/",
});

export default api;
