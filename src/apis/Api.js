import axios from "axios";

let Api = axios.create({
  //baseURL: "http://localhost:8000/api"
  //baseURL: "http://127.0.0.1:8000"
  // [http://127.0.0.1:8000].
  baseURL: process.env.VUE_APP_API_BASE_URL || "http://127.0.0.1:8000", // Fallback in case the env variable is not set
 

});

Api.defaults.withCredentials = true;

export default Api;
