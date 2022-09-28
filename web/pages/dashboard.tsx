import React, { useContext, useEffect, useState } from "react";
import authService from "./api/services/auth.service";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";
import UserWelcome from "../components/UserWelcome";
import userService from "./api/services/user.service";
// use AuthContext to conditionally render the dashboard features.

const Dashboard = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    userService.getUser().then((res) => {
      setUserData(res.data);
    });
  });

  return (
    <div>
      <NavBar />
      <UserWelcome userData={userData} />
    </div>
  );
};

export default Dashboard;
