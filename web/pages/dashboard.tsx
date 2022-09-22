import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { UserProfileService } from "../services/UserProfileService";

// use AuthContext to conditionally render the dashboard features.

const dashboard = ({ state }: any) => {
  const { getUser } = new UserProfileService();

  try {
    const userData = getUser(state.userProfileId);
    console.log(userData);
  } catch (error) {
    console.log(error);
  }

  return <div>Hello, </div>;
};

export default dashboard;
