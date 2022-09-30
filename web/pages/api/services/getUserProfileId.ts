import jwt_decode from "jwt-decode";

export default function getUserProfileId() {
  const userStr = localStorage.getItem("userToken");
  let user = null;
  let payload: any = null;

  if (userStr) {
    user = JSON.parse(userStr);

    if (user && user.token) {
      payload = jwt_decode(user.token);
      return payload.userProfileId;
    }
    return payload;
  }
}
