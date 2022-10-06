import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import routeGuard from "../authentication/routeGuard";
import Head from "next/head";

const Dashboard = ({ user }: any) => {
    // console.log(user);

    return (
        <div>
            <Head>
                <title>Dashboard - Fitness Tracker App</title>
            </Head>
            <NavBar />
            <h1 className="font-Poppins ml-[43px] pt-[58px] font-bold text-[32px]">
                Hello, {user.firstName}!
            </h1>
        </div>
    );
};

export default routeGuard(Dashboard);
