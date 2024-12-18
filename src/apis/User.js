import Api from "./Api";
import Csrf from "./Csrf";

export default {
  async register(form) {
    await Csrf.getCookie();

    //return Api.post("/register", form);
    return Api.post("/api/vaccine/auth/register", form);
    //auth/register
  },

  async registerUserFromUser(form) {
    const token = localStorage.getItem("token"); // Get the token from localStorage
  
    // Make the API call to log out
    await Api.post("/api/vaccine/auth/register-vaccine-user", form, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
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
  },

  // Add this method for form data submission
  async submitCenterData(form) {
    const token = localStorage.getItem("token"); // Example: Get the token from localStorage

    return Api.post("/api/vaccine/vaccination-center", form, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });

    //await Csrf.getCookie();
    //return Api.post("/api/vaccine/vaccination-center", form);
  },

  async getCenterList() {
    const token = localStorage.getItem("token");
    try {
      const response = await Api.get("/api/vaccine/vaccination-center-lists", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      return response.data; // Assuming the API returns an array of data
    } catch (error) {
      console.error("Error fetching center list:", error);
      throw error; // Rethrow error so it can be handled by the caller
    }
  },
};
