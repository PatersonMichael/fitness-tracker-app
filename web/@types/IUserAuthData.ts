import { LargeNumberLike } from "crypto";

export interface IUserAuthDataRequest {
  emailAddress: string;
  password: string;
}

export interface IUserAuthDataResponse {
  userProfileId: string;
  token: string;
}
