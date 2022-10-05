import React, { useContext, useEffect, useState } from "react";
import authService from "./api/services/auth.service";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";
import UserWelcome from "../components/UserWelcome";
import userService from "./api/services/user.service";
import { IUserInfoNoPass } from "../@types/IUserInfo";
import routeGuard from "../authentication/routeGuard";
// use AuthContext to conditionally render the dashboard features.

const Dashboard = ({ user }: any) => {
    // console.log(user);

    return (
        <div>
            <NavBar />
            <h1 className="font-Poppins ml-[43px] pt-[58px] font-bold text-[32px]">
                Hello, {user.firstName}!
            </h1>
        </div>
    );
};

export default routeGuard(Dashboard);
