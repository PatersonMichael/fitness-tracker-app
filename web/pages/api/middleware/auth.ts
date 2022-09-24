import cookie from "cookie";
// Checks if user has valid auth data, namely a valid JWT token

// If not, forces redirect to home page or login

// If user is logged in, prevents access to login page so the user doesn't try to log in twice without logging out first.

export default async function checkUser(req: any, res: any) {
  try {
    const cookies = cookie.parse(req);

    const jwt = cookies.authCookieJWT;

    console.log(jwt);

    res.json({ message: "Yay!" });
  } catch (error) {
    console.log("Uh Oh.." + error);
  }
}
