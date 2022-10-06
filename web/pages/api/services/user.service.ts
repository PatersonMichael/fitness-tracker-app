import axios from "axios";
import authHeader from "./auth.header";
import getUserProfileId from "./getUserProfileId";

// const API_URL = "http://localhost:8088/api/";

const API_URL =
    process.env.NODE_ENV === "production"
        ? process.env.API_URL
        : "http://localhost:8088/api/";

// const id = getUserProfileId();

class UserService {
    getUser(token: string) {
        const id = getUserProfileId();
        return axios.get(API_URL + `userprofiles/${id}`, {
            headers: {
                "x-access-token": token,
            },
        });
    }
}

export default new UserService();
