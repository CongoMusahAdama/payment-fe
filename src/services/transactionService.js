import { URL } from "@/utils/constant";
import axios from "axios";


// const API_URL = 'http://localhost:5000/api/transactions/';
const API_URL = `${URL}`;

const depositFunds = async (depositData, token) => {
  const response = await axios.post(`${API_URL}/payments/deposit`, depositData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getTransactionHistory = async (token, filters) => {
  const response = await axios.get(`${API_URL}/transactions/history`, {
    params: filters,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const transferMoney = async (transferData, token) => {
  const response = await axios.post(`${API_URL}/transactions/transfer`, transferData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getBalance = async (token) => {
  const response = await axios.get(`${API_URL}/payments/balance`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const verifyDeposit = async (reference, token) => {
  const response = await axios.get(`${API_URL}/payments/verify`, {
    params: {
      reference,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const requestMoney = async (token, requestData) => {
  const response = await axios.post(`${API_URL}/transactions/request-money`, requestData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const moneyRequests = async (token) => {
  const response = await axios.get(`${API_URL}/transactions/requests`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const transactionService = {
  depositFunds,
  requestMoney,
  getTransactionHistory,
  transferMoney,
  getBalance,
  verifyDeposit,
  moneyRequests,
};

export default transactionService;
