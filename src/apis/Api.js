import axios from "axios";

let Api = axios.create({
  //baseURL: "http://localhost:8000/api"
  baseURL: "http://127.0.0.1:8000"
  // [http://127.0.0.1:8000]. 

});

Api.defaults.withCredentials = true;

export default Api;
