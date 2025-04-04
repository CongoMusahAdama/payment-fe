import { getAccessToken, URL } from "../utils/constant";
import axios from "axios";

//const API_URL = 'http://localhost:5000/api/auth/';
const API_URL = `${URL}/auth/`;

const register = async (userData) => {
  const response = await axios.post(`${API_URL}register`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData);
  return response.data;
};

const logout = async () => {
  const token = getAccessToken();
  console.log(token);
  await axios.post(
    `${API_URL}logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const refreshToken = async (token) => {
  const response = await axios.post(`${API_URL}refresh-token`, { refreshToken: token });
  return response.data;
};

const mfaSetup = async (email) => {
  const response = await axios.post(`${API_URL}mfa-setup`, { email });
  return response.data;
};

const mfaVerify = async (email, code) => {
  const response = await axios.post(`${API_URL}mfa-verify`, { email, code });
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  refreshToken,
  mfaSetup,
  mfaVerify,
};

export default authService;
