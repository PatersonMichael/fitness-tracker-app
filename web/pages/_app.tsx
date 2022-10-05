import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import userService from "./api/services/user.service";
import authService from "./api/services/auth.service";
import NavBar from "../components/NavBar";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div>
            <Head>
                <title>Fitness Tracker App</title>
            </Head>
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
