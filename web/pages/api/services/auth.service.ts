import axios from "axios";
import { IUserAuthDataRequest } from "../../../@types/IUserAuthData";
import { IUserInfo } from "../../../@types/IUserInfo";
import { useRouter } from "next/router";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

const API_URL = "http://localhost:8088/api/";

class AuthService {
  // router = useRouter();
  login(userAuthData: IUserAuthDataRequest) {
    // POST userAuthData, save JWT to localStorage
    try {
      return axios
        .post(`${API_URL}authentication`, userAuthData)
        .then((response) => {
          if (response.data.token) {
            localStorage.setItem("userToken", JSON.stringify(response.data));
          } else if (response.status === 401) {
            // console.log(response.data.message);

            return response.data.message;
          }

          return response.data;
        });
    } catch (error) {
      // console.log("error msg: " + error);
    }
  }

  logout() {
    // remove JWT from localStorage
    localStorage.removeItem("userToken");
    // setTimeout(() => {
    //   location.reload();
    // }, 1000);
  }

  register(signUpData: IUserInfo) {
    return axios.post(`${API_URL}userprofiles`, signUpData);
  }
  //register()
  //POST {sign up data}

  // get stored user info (including JWT)
  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }

  checkUser() {
    if (localStorage.getItem("user")) {
      return true;
    }
  }
}

export default new AuthService();
