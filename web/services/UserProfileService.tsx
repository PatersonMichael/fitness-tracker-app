import axios from "axios";
import { IUserInfo } from "../@types/IUserInfo";
import {
  IUserAuthDataRequest,
  IUserAuthDataResponse,
} from "../@types/IUserAuthData";
import { AuthContext } from "../context/AuthContext";
import { IAuthContext } from "../@types/IAuthContext";
import { useContext } from "react";

export class UserProfileService {
  public async authenticateUser(userAuthData: IUserAuthDataRequest) {
    // POSTs user email and password to API to auth user
    try {
      const res = await axios.post(
        "http://localhost:8088/api/authentication",
        userAuthData
      );

      console.log(res.data);
      if (res.status === 200) {
        console.log("User Logged in.");
        // if 200 OK, pass data to AuthProvider
        return res.data;
      }
      // if anything other than 200 OK, pass errormsg to Login Page to display to user.
    } catch (error) {
      console.log(error);
      return "An error has occured";
    }
  }

  public async createUser() {
    // POSTs a new user profile to API
  }

  public async getUser(userProfileId: string) {
    // GETs user data from API
    try {
      const res = await axios.get(
        `http://localhost:8088/api/userprofiles/${userProfileId}`
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  public async updateUser() {
    // PUTs changed user data to the API to update user info
  }

  public async deleteUser() {
    // DELETEs user data from API
  }
}
