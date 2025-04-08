import { clear } from "console";
import { TokenResponse } from "./types/profile";

const isLocalHost = true;



//const useLocalHost = true;

export const URL = isLocalHost ? "http://localhost:5000/api" : "https://payment-be-3tc2.onrender.com/api";


export const saveAuthTokens = (tokens: TokenResponse) => {
  localStorage.setItem("accessToken", tokens.token);
  localStorage.setItem("refreshToken", tokens.refreshToken);
};

export const getAccessToken = () => localStorage.getItem("accessToken");
export const getRefreshToken = () => localStorage.getItem("refreshToken");

export const clearAuthTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

