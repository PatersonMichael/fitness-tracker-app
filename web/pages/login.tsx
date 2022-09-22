import Link from "next/link";
import React, { useState } from "react";
import { UserProfileService } from "../services/UserProfileService";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  // need to useState to collect data, then pass data
  // to UserProfileService in order to authenticateUser
  // need onChange attributes on each input to add new value to data.
  const router = useRouter();
  const initialState = {
    emailAddress: "",
    password: "",
  };
  const [data, setData] = useState(initialState);
  const { authenticateUser } = new UserProfileService();

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(data);

    try {
      authenticateUser(data);
      console.log("submitted");
    } catch (error) {
      console.log(error);
      console.log("an error has occurred");
    }
  };

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
          value={data.emailAddress}
          onChange={handleChange}
          name="emailAddress"
          id="loginEmail"
          placeholder="@email"
        />
        <label htmlFor="loginPass" className="mt-[47px]">
          Password
        </label>
        <input
          className="bg-boxGrey w-[343px] h-[85px] placeholder-black text-[24px] p-2 font-Inter"
          type="password"
          value={data.password}
          onChange={handleChange}
          name="password"
          id="loginPass"
          placeholder="password"
        />
        <div className="flex justify-end">
          <button
            className="bg-primary text-white font-Inter font-bold w-[163px] h-[49px] mt-[15px]"
            // type="submit"
            onClick={handleSubmit}
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

export default Login;
