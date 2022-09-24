import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContext, reducer, defaultAuthState } from "../context/AuthContext";
import { useReducer } from "react";
import { IAuthContext } from "../@types/IAuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, defaultAuthState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <Component {...pageProps} state={state as IAuthContext} />
    </AuthContext.Provider>
  );
}

export default MyApp;
