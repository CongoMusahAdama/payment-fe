import { URL } from "@/utils/constant";
import axios from "axios";

// const API_URL = "http://localhost:5000/api/payments/";
const API_URL = `${URL}/payments/`;

const initiatePayment = async (paymentData) => {
  const response = await axios.post(`${API_URL}initiate`, paymentData);
  return response.data;
};

const verifyPayment = async (reference) => {
  const response = await axios.get(`${API_URL}verify/${reference}`);
  return response.data;
};

const requestWithdrawal = async (token, amount) => {
  const response = await axios.post(
    `${API_URL}withdraw/request-otp`,
    { amount },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const verifyWithdrawal = async (token, otp, amount) => {
  const response = await axios.post(
    `${API_URL}withdraw/verify`,
    { otp, amount },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const initiateDeposit = async (paymentData) => {
  const response = await axios.post(`${API_URL}payments/deposit`, paymentData);
  return response.data;
};

const paymentService = {
  initiatePayment,
  verifyPayment,
  initiateDeposit,
  requestWithdrawal,
  verifyWithdrawal,
};

export default paymentService;
