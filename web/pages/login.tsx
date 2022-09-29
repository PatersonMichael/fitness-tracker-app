import Link from "next/link";
import { useState, useEffect } from "react";
import { IUserAuthDataRequest } from "../@types/IUserAuthData";
import { validateLogin } from "../validators/validator";
import authService from "./api/services/auth.service";
import { useRouter } from "next/router";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import getUserProfileId from "./api/services/getUserProfileId";

function LoginRefactor() {
  const initialValues: IUserAuthDataRequest = {
    emailAddress: "",
    password: "",
  };

  const router = useRouter();

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isLogging, setIsLogging] = useState(false);

  const [credentialStatus, setCredentialStatus] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLogging(true);
    const { error, value } = validateLogin(formValues);
    if (error) {
      console.log(error);
      setCredentialStatus("Invalid Credentials");
      setIsLogging(false);
    } else {
      console.log(value);
      setCredentialStatus("Success!");
      try {
        authService.login(value);
        router.push("/dashboard");
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="container mx-auto flex flex-col items-center">
        {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
        <div className="text-primary font-Poppins font-bold text-[48px] mt-[41px]">
          Login
        </div>
        <p className="text-red-700 font-Inter font-bold absolute mt-[30vh]">
          {credentialStatus}
        </p>
        <form className="flex flex-col mt-[126px]" onSubmit={handleSubmit}>
          <label htmlFor="loginEmail">Email</label>
          <input
            className="bg-boxGrey w-[343px] h-[85px] placeholder-black text-[24px] p-2 font-Inter"
            type="email"
            name="emailAddress"
            id="loginEmail"
            value={formValues.emailAddress}
            onChange={handleChange}
            placeholder="@email"
            disabled={isLogging}
          />
          <label htmlFor="loginPass" className="mt-[47px]">
            Password
          </label>
          <input
            className="bg-boxGrey w-[343px] h-[85px] placeholder-black text-[24px] p-2 font-Inter"
            type="password"
            name="password"
            id="loginPass"
            value={formValues.password}
            onChange={handleChange}
            placeholder="password"
            disabled={isLogging}
          />
          <div className="flex justify-end">
            <button
              className="bg-primary text-white font-Inter font-bold w-[163px] h-[49px] mt-[15px]"
              disabled={isLogging}
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
    </div>
  );
}

export default LoginRefactor;
