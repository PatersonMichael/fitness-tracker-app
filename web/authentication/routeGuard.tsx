/* eslint-disable react/display-name */

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { IUserInfoNoPass } from "../@types/IUserInfo";
import userService from "../pages/api/services/user.service";

const routeGuard = (Component: any) => {
  return (props: any) => {
    const initialUserState: IUserInfoNoPass = {
      emailAddress: "",
      firstName: "",
      lastName: "",
    };

    const router = useRouter();
    const [user, setUser] = useState(initialUserState);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      const checkToken = async () => {
        const token = localStorage.getItem("userToken");
        if (!token) {
          router.replace("/");
        } else {
          const response: any = await userService.getUser(
            JSON.parse(token).token
          );
          console.log(response);

          if (response.status !== 200) {
            localStorage.removeItem("userToken");
            router.replace("/");
          } else {
            const userData = await response.data;
            if (!userData._id) {
              router.replace("/");
              localStorage.removeItem("userToken");
            } else {
              console.log(userData);
              setUser(userData);
              setAuthenticated(true);
            }
          }
        }
      };
      checkToken();
    }, []);

    if (authenticated) {
      return <Component {...props} user={user} />;
    } else {
      return null;
    }
  };
};

export default routeGuard;
