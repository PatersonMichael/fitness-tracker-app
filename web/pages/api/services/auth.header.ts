export default function authHeader() {
  //checks localStorage for user
  const userStr = localStorage.getItem("userToken");
  let user = null;
  // If a user exists and there is an access token, return token as header
  if (userStr) {
    user = JSON.parse(userStr);

    if (user && user.token) {
      return { "x-access-token": user.token };
      // return { Authorization: 'Bearer ' + user.token}; <-- alternative header
    } else {
      return { "x-access-token": null };
      // return { Authorization: ''}; <-- alternative header
    }
  }
}
