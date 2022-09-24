import axios from "axios";
import { setRevalidateHeaders } from "next/dist/server/send-payload";
import { parse } from "cookie";
import {
  IUserAuthDataRequest,
  IUserAuthDataResponse,
} from "../../../@types/IUserAuthData";

// takes email and password

// fetches userProfileId and Token from API using axios POST request

// stores userProfileId and Token into a serialized cookie

// returns 200 status code or error message

export async function authenticateUser(userAuthData: IUserAuthDataRequest) {
  try {
    const resp = await axios.post(
      "http://localhost:8088/api/authentication",
      userAuthData
    );
    if (resp.status === 200) {
      // console.log(resp.data);

      const storedAuth = await axios.post("/api/auth/login", resp.data);
      console.log(storedAuth);
    }
  } catch (error) {
    console.log(error);
  }
}

// async function storeAuth(req: IUserAuthDataResponse, res) {
//   const setCookie = serialize("authCookie", req, {
//     httpOnly: true,
//     sameSite: "strict",
//     secure: process.env.NODE_ENV !== "development",
//     maxAge: 3600,
//     path: "/",
//   });
//   return;
// }
