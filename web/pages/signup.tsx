import Link from "next/link";
import { useState, useEffect } from "react";
import { validateSignUp } from "../validators/validator";
import authService from "./api/services/auth.service";
import { useRouter } from "next/router";
import { IUserInfo } from "../@types/IUserInfo";

function SignUp() {
  const initialValues: IUserInfo = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
  };

  const router = useRouter();
  let toolTip: string = "";

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isLogging, setIsLogging] = useState(false);
  const [toolTipOn, setToolTipOn] = useState(false);

  const [credentialStatus, setCredentialStatus] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLogging(true);
    const { error, value } = validateSignUp(formValues);
    if (error) {
      console.log(error);
      setCredentialStatus("Invalid Credentials");
      setIsLogging(false);
    } else {
      console.log(value);
      authService.register(value);
      setCredentialStatus("Success!");
      router.push("/login");
    }
  };

  const togglePasswordTooltip = () => {
    setToolTipOn(!toolTipOn);
  };

  if (toolTipOn === true) {
    toolTip = `At least 1 lowercase, uppercase, number, and symbol.`;
  } else {
    toolTip = "";
  }

  return (
    <div>
      <div className="container mx-auto flex flex-col items-center">
        {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
        <div className="text-primary font-Poppins font-bold text-[48px] mt-[41px]">
          Sign Up
        </div>
        <p className="text-red-700 font-Inter font-bold absolute mt-[30vh]">
          {credentialStatus}
        </p>
        <form className="flex flex-col mt-[126px]" onSubmit={handleSubmit}>
          <label htmlFor="signUpFirstName" className="">
            First Name
          </label>
          <input
            className="bg-boxGrey w-[343px] h-[85px] placeholder-black text-[24px] p-2 font-Inter"
            type="text"
            name="firstName"
            id="signUpFirstName"
            value={formValues.firstName}
            onChange={handleChange}
            placeholder="First name"
            disabled={isLogging}
          />
          <label htmlFor="signUpLastName" className="mt-[47px]">
            Last Name
          </label>
          <input
            className="bg-boxGrey w-[343px] h-[85px] placeholder-black text-[24px] p-2 font-Inter"
            type="text"
            name="lastName"
            id="signUpLastName"
            value={formValues.lastName}
            onChange={handleChange}
            placeholder="Last name"
            disabled={isLogging}
          />
          <label htmlFor="loginEmail" className="mt-[47px]">
            Email
          </label>
          <input
            className="bg-boxGrey w-[343px] h-[85px] placeholder-black text-[24px] p-2 font-Inter"
            type="email"
            name="emailAddress"
            id="signUpEmail"
            value={formValues.emailAddress}
            onChange={handleChange}
            placeholder="@email"
            disabled={isLogging}
          />
          <label htmlFor="loginPass" className="mt-[47px]">
            Password
          </label>
          <input
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            className=" bg-boxGrey w-[343px] h-[85px] placeholder-black text-[24px] p-2 font-Inter "
            type="password"
            name="password"
            id="signUpPass"
            value={formValues.password}
            onChange={handleChange}
            placeholder="password"
            disabled={isLogging}
            onMouseEnter={togglePasswordTooltip}
            onMouseLeave={togglePasswordTooltip}
          />
          <div>
            <p className="text-[12px]">{toolTip}</p>
          </div>
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
          <p className="mt-[24px]">
            Already have an account?{" "}
            <span className="font-inter text-[16px] text-secondary text-center">
              <Link href="/">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
