import { URL } from "@/utils/constant";
import axios from "axios";

// const API_URL = 'http://localhost:5000/api/users/';
const API_URL = `${URL}`;

const getProfile = async () => {
  const response = await axios.get(`${API_URL}/users/profile`);
  return response.data;
};

const updateProfile = async (profileData, token) => {
  console.log("profileData", profileData);

  const response = await axios.put(`${API_URL}/users/profile`, profileData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const uploadKYC = async (formData) => {
  const response = await axios.post(`${API_URL}/upload-kyc`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const profileService = {
  getProfile,
  updateProfile,
  uploadKYC,
};

export default profileService;
