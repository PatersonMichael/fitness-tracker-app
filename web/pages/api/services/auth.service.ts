import axios from "axios";
import { IUserAuthDataRequest } from "../../../@types/IUserAuthData";

const API_URL = "http://localhost:8088/api";

class AuthService {
  login(userAuthData: IUserAuthDataRequest) {
    // POST userAuthData to
    return axios
      .post(`${API_URL}/authentication`, userAuthData)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();

//login()
// POST {email, pass} and save JWT to localStorage

//logout()
// remove JWT from localStorage

//register()
//POST {sign up data}

//getCurrentUser()
// get stored user info (including JWT)
