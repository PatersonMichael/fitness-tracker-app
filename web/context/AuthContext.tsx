import { IAuthContext } from "../@types/IAuthContext";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
} from "react";

// If user is not authenticated: (default)
// isAuthenticated is false
// userProfileId is null
// token is null

export const defaultAuthState: IAuthContext = {
  isAuthenticated: false,
  userProfileId: null,
  token: null,
};

export const AuthContext = createContext(defaultAuthState);

export const reducer = (state: IAuthContext, action: any) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem(
        "userProfileId",
        JSON.stringify(action.payload.userProfileId)
      );
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        userProfileId: action.payload.userProfileId,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};
