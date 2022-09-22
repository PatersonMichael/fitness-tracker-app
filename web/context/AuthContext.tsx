import { triggerAsyncId } from "async_hooks";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
} from "react";

interface initialState {
  isAuthenticated: boolean;
  user: number | null;
  token: number | null;
}
const initialState: initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};
export const AuthContext = createContext({});

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
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

export const editAuth = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}></AuthContext.Provider>
  );
};
