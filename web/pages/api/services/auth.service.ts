import axios from "axios";
import { IUserAuthDataRequest } from "../../../@types/IUserAuthData";

const API_URL = "http://localhost:8088/api/";

class AuthService {
  login(userAuthData: IUserAuthDataRequest) {
    // POST userAuthData, save JWT to localStorage
    return axios
      .post(`${API_URL}authentication`, userAuthData)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    // remove JWT from localStorage
    localStorage.removeItem("user");
  }

  //register()
  //POST {sign up data}

  // get stored user info (including JWT)
  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
