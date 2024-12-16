import Api from "./Api";
import Csrf from "./Csrf";

export default {
  async register(form) {
    await Csrf.getCookie();

    //return Api.post("/register", form);
    return Api.post("/api/vaccine/auth/register", form);
    //auth/register
  },

  async login(form) {
    await Csrf.getCookie();

    return Api.post("/api/vaccine/auth/login", form);
  },

  async logout() {
    const token = localStorage.getItem("token"); // Get the token from localStorage
  
    try {
      // Make the API call to log out
      await Api.post("/api/vaccine/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      localStorage.removeItem("token");
    } catch (error) {
      localStorage.removeItem("token");
    }
  },

  

  auth() {
    const token = localStorage.getItem("token"); // Example: Get the token from localStorage

    //return Api.get("/api/user");
    return Api.get("/api/user", {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
  },

  getCenters() {
    return Api.get("/api/vaccine/available-vaccination-center");
  }
};
