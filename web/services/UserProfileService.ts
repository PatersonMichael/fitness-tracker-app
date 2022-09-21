import axios from "axios";

interface profileData {
  userid?: number;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}

export class UserProfileService {
  profileData; // field to pass user data into

  // Collect relevant data when instantiated
  constructor(data: profileData) {
    this.profileData = data;
  }

  async authenticateUser() {
    // POSTs user email and password to API to auth user
    try {
      const resp = await axios.post(
        "http://localhost:8088/api/authentication",
        this.profileData
      );
      console.log(resp.data);
      console.log("User Logged in:");
    } catch (error) {
      console.log(error);
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
