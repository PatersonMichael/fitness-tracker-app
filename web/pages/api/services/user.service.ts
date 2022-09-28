import axios from "axios";
import authHeader from "./auth.header";
import getUserProfileId from "./getUserProfileId";

const API_URL = "http://localhost:8088/api/";
const id = getUserProfileId();

class UserService {
  async getUser() {
    return await axios.get(API_URL + `userprofiles/${id}`, {
      headers: authHeader(),
    });
  }
}

export default new UserService();
