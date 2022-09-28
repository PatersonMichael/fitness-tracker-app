import React from "react";

const UserWelcome = ({ userData }: any) => {
  return (
    <div>
      <h1 className="font-Poppins ml-[43px] pt-[58px] font-bold text-[32px]">
        Welcome, {userData.firstName}
      </h1>
    </div>
  );
};

export default UserWelcome;
