import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContext, reducer, defaultAuthState } from "../context/AuthContext";
import { useEffect, useReducer, useState } from "react";
import { IAuthContext } from "../@types/IAuthContext";
import userService from "./api/services/user.service";
import authService from "./api/services/auth.service";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
