import Link from "next/link";
import React from "react";

const login = () => {
  // need to useState to collect data, then pass data
  // to UserProfileService in order to authenticateUser
  // need onChange attributes on each input to add new value to data.

  return (
    <div className="container mx-auto flex flex-col items-center">
      <div className="text-primary font-Poppins font-bold text-[48px] mt-[41px]">
        Login
      </div>
      <form className="flex flex-col mt-[126px]">
        <label htmlFor="loginEmail">Email</label>
        <input
          className="bg-boxGrey w-[343px] h-[85px] placeholder-black text-[24px] p-2 font-Inter"
          type="email"
          name="loginEmail"
          id="loginEmail"
          placeholder="@email"
        />
        <label htmlFor="loginPass" className="mt-[47px]">
          Password
        </label>
        <input
          className="bg-boxGrey w-[343px] h-[85px] placeholder-black text-[24px] p-2 font-Inter"
          type="password"
          name="loginPass"
          id="loginPass"
          placeholder="password"
        />
        <div className="flex justify-end">
          <button
            className="bg-primary text-white font-Inter font-bold w-[163px] h-[49px] mt-[15px]"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
      <div className="flex flex-col mt-[26px]">
        <a
          className="font-inter text-[16px] text-secondary text-center"
          href="#"
        >
          Forgot Password?
        </a>
        <p className="mt-[24px]">
          New Here?{" "}
          <span className="font-inter text-[16px] text-secondary text-center">
            <Link href="/signup">Sign Up</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default login;
