import { IUserAuthDataResponse } from "../../../@types/IUserAuthData";
import { serialize } from "cookie";
import http from "http";

export default async function storeAuth(req: any, res: any) {
  console.log(JSON.stringify(req.body));

  try {
    res.setHeader("Set-Cookie", [
      serialize("authCookieJWT", req.body.token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
        maxAge: 3600,
        path: "/",
      }),
      serialize("authCookieUserPofileId", req.body.userProfileId, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
        maxAge: 3600,
        path: "/",
      }),
    ]);
    res.status(200).json({ message: "all set!" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
}
