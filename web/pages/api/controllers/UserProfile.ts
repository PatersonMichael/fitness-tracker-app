// Imports
import { authenticateUser } from "../services/AuthenticateUser";
// import { CreateUser } from "../services/CreateUser";
// import { GetUser } from "../services/GetUser";
// import { UpdateUser } from "../services/UpdateUser";
// import { DeleteUser } from "../services/DeleteUser";
import { IUserAuthDataRequest } from "../../../@types/IUserAuthData";

// Auth
// Takes email and password, returns cookie that contains fetched userProfileId and Token from API
export async function loginUser(userAuthData: IUserAuthDataRequest) {
  await authenticateUser(userAuthData);
  console.log("authenticating user!");
}

// CreateUser
// Takes SignUp data and POSTS new user to DB, returns 201 code.

// GetUser
// Takes auth cookie and returns userData

// UpdateUser
// takes auth cookie and edits to userData, returns edited userData and status code

// DeleteUser
// takes auth cookie, returns status code, deletes auth cookie
