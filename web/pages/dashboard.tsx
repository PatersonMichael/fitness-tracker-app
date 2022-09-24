import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import authService from "./api/services/auth.service";
import { useRouter } from "next/router";
// use AuthContext to conditionally render the dashboard features.

const Dashboard = ({ state }: any) => {
  const router = useRouter();

  async function handleLogout() {
    authService.logout();
    router.push("/");
  }

  return (
    <div>
      Hello,
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
