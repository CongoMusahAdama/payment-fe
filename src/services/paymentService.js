import { URL } from "../utils/constant";
import axios from "axios";

const API_URL = `${URL}/payments/`;

const initiatePayment = async (paymentData, token) => {
  const response = await axios.post(`${API_URL}initiate`, paymentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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

const initiateDeposit = async (paymentData, token) => {
  try {
    const response = await axios.post(`${API_URL}deposit`, paymentData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    return response.data;
  } catch (error) {
    console.error('Deposit failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Deposit processing failed');
  }
};

const paymentService = {
  initiatePayment,
  verifyPayment,
  initiateDeposit,
  requestWithdrawal,
  verifyWithdrawal,
};

export default paymentService;
