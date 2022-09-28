import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import authService from "../pages/api/services/auth.service";

const NavBar = () => {
  const [isToggled, setIsToggled] = useState(false);

  const router = useRouter();

  function toggleBar() {
    if (isToggled === true) {
      return "w-60 h-full shadow-md bg-boxGrey px-1 absolute flex flex-col duration-700";
    } else {
      return "w-60 h-full shadow-md bg-boxGrey px-1 absolute flex flex-col -ml-60 duration-700";
    }
  }

  function handleToggle() {
    setIsToggled(!isToggled);
  }

  async function handleLogout() {
    await authService.logout();
    router.push("/");
  }

  return (
    <div className="">
      <button className="mt-6 ml-6 absolute" onClick={handleToggle}>
        <Image
          src="/../public/assets/Hamburger.png"
          alt="Toggle Nav"
          height={20}
          width={36}
        />
      </button>
      <div className={toggleBar()}>
        <div className="flex justify-end items-end">
          <button className="mt-4 mr-4" onClick={handleToggle}>
            <Image
              src="/../public/assets/Back Arrow.png"
              alt="Toggle Nav"
              height={20}
              width={30}
            />
          </button>
        </div>
        <ul className="relative flex flex-col items-center">
          <li className="relative">
            <button className="bg-primary text-white font-Inter font-bold w-40 h-[40px] mt-[15px]">
              Placeholder 1
            </button>
          </li>
          <li className="relative">
            <button className="bg-primary text-white font-Inter font-bold w-40 h-[40px] mt-[15px]">
              Placeholder 2
            </button>
          </li>
          <li className="relative">
            <button
              className="bg-primary text-white font-Inter font-bold w-40 h-[40px] mt-[15px]"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
