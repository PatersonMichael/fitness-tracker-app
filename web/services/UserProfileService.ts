import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { IUserInfo } from "../@types/IUserInfo";
import {
  IUserAuthDataRequest,
  IUserAuthDataResponse,
} from "../@types/IUserAuthData";

export class UserProfileService {
  // profileData;

  // Collect relevant data when instantiated
  // constructor(data: IUserInfo) {
  //   this.profileData = data;
  // }

  async authenticateUser(userAuthData: IUserAuthDataRequest) {
    // POSTs user email and password to API to auth user
    try {
      const res = await axios.post(
        "http://localhost:8088/api/authentication",
        userAuthData
      );
      console.log(res);
      console.log("User Logged in.");
    } catch (error) {
      console.log(error);
      return "An error has occured";
    }
  }

  async createUser() {
    // POSTs a new user profile to API
  }

  async getUser() {
    // GETs user data from API
  }

  async updateUser() {
    // PUTs changed user data to the API to update user info
  }

  async deleteUser() {
    // DELETEs user data from API
  }
}
