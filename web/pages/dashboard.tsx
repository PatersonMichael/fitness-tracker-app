import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import authService from "./api/services/auth.service";
import { useRouter } from "next/router";
import getUserProfileId from "./api/services/getUserProfileId";
import userService from "./api/services/user.service";
import { stringify } from "querystring";
// use AuthContext to conditionally render the dashboard features.

const Dashboard = () => {
  const router = useRouter();

  const initialState = {
    birthDate: "",
    emailAddress: "",
    firstName: "",
    gender: "",
    lastName: "",
  };

  const [userInfo, setUserInfo] = useState(initialState);

  async function handleLogout() {
    authService.logout();
    router.push("/");
  }

  return (
    <div className="container flex flex-col">
      <div>Hello, {userInfo.firstName}</div>
      <button
        className="bg-primary text-white font-Inter font-bold w-[163px] h-[49px] mt-[15px]"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;
